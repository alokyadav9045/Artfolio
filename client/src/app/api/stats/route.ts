import { NextResponse } from 'next/server'
import { Artwork, User, Comment, Like } from '@/lib/models'
import { withDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const result = await withDatabase(
      async () => {
        // Get total counts
        const [totalArtworks, totalArtists, totalComments, totalLikes] = await Promise.all([
          Artwork.countDocuments({ isPublished: true }),
          User.countDocuments({ role: { $in: ['ARTIST', 'ADMIN'] } }),
          Comment.countDocuments(),
          Like.countDocuments(),
        ])

        // Get trending artworks (most liked in last 30 days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const trendingArtworks = await Artwork.find({
          isPublished: true,
          createdAt: { $gte: thirtyDaysAgo }
        })
        .populate('author', 'name username image')
        .populate('images')
        .sort({ likeCount: -1 })
        .limit(6)
        .lean()

        // Get featured artists (most artworks)
        const featuredArtists = await User.aggregate([
          {
            $lookup: {
              from: 'artworks',
              localField: '_id',
              foreignField: 'author',
              as: 'artworks'
            }
          },
          {
            $addFields: {
              artworkCount: { $size: '$artworks' }
            }
          },
          {
            $match: {
              artworkCount: { $gt: 0 },
              role: { $in: ['ARTIST', 'ADMIN'] }
            }
          },
          {
            $sort: { artworkCount: -1 }
          },
          {
            $limit: 6
          },
          {
            $project: {
              _id: 1,
              name: 1,
              username: 1,
              image: 1,
              bio: 1,
              artworkCount: 1
            }
          }
        ])

        // Get popular categories/tags
        const popularTags = await Artwork.aggregate([
          { $match: { isPublished: true } },
          { $unwind: '$tags' },
          {
            $group: {
              _id: '$tags',
              count: { $sum: 1 }
            }
          },
          { $sort: { count: -1 } },
          { $limit: 12 }
        ])

        // Get recent activity
        const recentActivity = await Artwork.find({ isPublished: true })
          .populate('author', 'name username image')
          .populate('images')
          .sort({ createdAt: -1 })
          .limit(8)
          .lean()

        // Transform trending artworks to match frontend types
        const trendingArtworksTransformed = trendingArtworks.map((artwork: Record<string, any>) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
          _id: artwork._id.toString(),
          title: artwork.title,
          slug: artwork.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
          images: artwork.images.map((img: Record<string, any>) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
            url: img.url,
            alt: img.alt,
          })),
          author: {
            name: artwork.author.name,
            username: artwork.author.username,
            image: artwork.author.image,
          },
          likeCount: artwork.likeCount || 0,
          commentCount: artwork.commentCount || 0,
          tags: artwork.tags || [],
          createdAt: artwork.createdAt,
        }))

        return {
          stats: {
            totalArtworks,
            totalArtists,
            totalComments,
            totalLikes,
          },
          trendingArtworks: trendingArtworksTransformed,
          featuredArtists,
          popularTags,
          recentActivity,
        }
      },
      // Fallback data when database is unavailable
      {
        stats: {
          totalArtworks: 0,
          totalArtists: 0,
          totalComments: 0,
          totalLikes: 0,
        },
        trendingArtworks: [],
        featuredArtists: [],
        popularTags: [],
        recentActivity: [],
      }
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch stats',
        message: 'Database connection unavailable. Using fallback data.'
      },
      { status: 503 }
    )
  }
}