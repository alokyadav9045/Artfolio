import mongoose from 'mongoose'

export interface IArtwork extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  title: string
  description?: string
  images: mongoose.Types.ObjectId[]
  tags: string[]
  author: mongoose.Types.ObjectId
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  viewCount: number
  likeCount: number
  commentCount: number
}

const ArtworkSchema = new mongoose.Schema<IArtwork>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 2000,
      trim: true,
    },
    images: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: true,
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 50,
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    isPublished: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
ArtworkSchema.index({ author: 1, createdAt: -1 })
ArtworkSchema.index({ tags: 1 })
ArtworkSchema.index({ title: 'text', description: 'text' })
ArtworkSchema.index({ isPublished: 1, createdAt: -1 })
ArtworkSchema.index({ likeCount: -1 })
ArtworkSchema.index({ viewCount: -1 })

export default mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema)