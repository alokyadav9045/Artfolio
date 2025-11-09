'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useLikeArtwork, useCreateComment } from '@/hooks/useArtworks'
import { Heart, MessageCircle, Share2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { use } from 'react'

interface ArtworkDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ArtworkDetailPage({ params }: ArtworkDetailPageProps) {
  const { id } = use(params)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [commentText, setCommentText] = useState('')
  const { data: session } = useSession()

  const { data: artwork, isLoading } = useQuery({
    queryKey: ['artwork', id],
    queryFn: async () => {
      const res = await fetch(`/api/artworks/${id}`)
      if (!res.ok) throw new Error('Failed to fetch artwork')
      return res.json()
    },
  })

  const likeMutation = useLikeArtwork()
  const commentMutation = useCreateComment()

  const handleLike = () => {
    likeMutation.mutate(id)
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      commentMutation.mutate({ artworkId: id, content: commentText.trim() })
      setCommentText('')
    }
  }

  const nextImage = () => {
    if (artwork?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % artwork.images.length)
    }
  }

  const prevImage = () => {
    if (artwork?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + artwork.images.length) % artwork.images.length)
    }
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Loading...</div></div>
  if (!artwork) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-white">Artwork not found</div></div>

  const currentImage = artwork.images[currentImageIndex]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isLiked = (session?.user as any)?.id && artwork.likes?.some((like: { userId: string }) => like.userId === (session?.user as any)?.id)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
              ← Back to Gallery
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-300">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-zinc-900 rounded-lg overflow-hidden">
              {currentImage ? (
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt || artwork.title}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  No image available
                </div>
              )}

              {/* Navigation arrows */}
              {artwork.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}
            </div>

            {/* Image thumbnails */}
            {artwork.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {artwork.images.map((image: { id: string; url: string }, index: number) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      index === currentImageIndex ? 'border-white' : 'border-zinc-700'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Title and Author */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{artwork.title}</h1>
              <Link
                href={`/artist/${artwork.author.username || artwork.author.id}`}
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={artwork.author.image} />
                  <AvatarFallback>
                    {artwork.author.name?.charAt(0) || artwork.author.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{artwork.author.name || 'Anonymous'}</span>
              </Link>
            </div>

            {/* Description */}
            {artwork.description && (
              <p className="text-zinc-300 leading-relaxed">{artwork.description}</p>
            )}

            {/* Tags */}
            {artwork.tags && artwork.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {artwork.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-zinc-800 text-zinc-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <Button
                variant="ghost"
                onClick={handleLike}
                disabled={likeMutation.isPending}
                className={`flex items-center gap-2 ${
                  isLiked ? 'text-red-500 hover:text-red-400' : 'text-zinc-400 hover:text-zinc-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{artwork.likeCount || 0}</span>
              </Button>

              <Button variant="ghost" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300">
                <MessageCircle className="w-5 h-5" />
                <span>{artwork.commentCount || 0}</span>
              </Button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Comments</h3>

              {/* Comment Form */}
              <form onSubmit={handleComment} className="space-y-3">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentText(e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500"
                  rows={3}
                />
                <Button
                  type="submit"
                  disabled={commentMutation.isPending || !commentText.trim()}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  {commentMutation.isPending ? 'Posting...' : 'Post Comment'}
                </Button>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {artwork.comments?.map((comment: {
                  id: string
                  content: string
                  createdAt: string
                  author: { name?: string; email?: string; image?: string }
                }) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.author.image} />
                      <AvatarFallback>
                        {comment.author.name?.charAt(0) || comment.author.email?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-white">{comment.author.name || 'Anonymous'}</span>
                        <span className="text-sm text-zinc-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-zinc-300">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}