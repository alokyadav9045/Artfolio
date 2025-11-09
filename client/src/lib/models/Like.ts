import mongoose from 'mongoose'

export interface ILike extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  user: mongoose.Types.ObjectId
  artwork: mongoose.Types.ObjectId
  createdAt: Date
}

const LikeSchema = new mongoose.Schema<ILike>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create a compound index to ensure a user can only like an artwork once
LikeSchema.index({ user: 1, artwork: 1 }, { unique: true })
LikeSchema.index({ artwork: 1, createdAt: -1 })

export default mongoose.models.Like || mongoose.model<ILike>('Like', LikeSchema)