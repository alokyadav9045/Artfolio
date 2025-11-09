import mongoose from 'mongoose'

export interface IComment extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  content: string
  user: mongoose.Types.ObjectId
  artwork: mongoose.Types.ObjectId
  parentComment?: mongoose.Types.ObjectId
  replies: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
      minlength: 1,
    },
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
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
CommentSchema.index({ artwork: 1, createdAt: -1 })
CommentSchema.index({ user: 1, createdAt: -1 })
CommentSchema.index({ parentComment: 1 })

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema)