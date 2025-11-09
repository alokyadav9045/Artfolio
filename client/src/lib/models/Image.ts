import mongoose from 'mongoose'

export interface IImage extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  url: string
  publicId?: string
  filename: string
  size: number
  mimeType: string
  width?: number
  height?: number
  alt?: string
  artwork: mongoose.Types.ObjectId
  uploadedBy: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const ImageSchema = new mongoose.Schema<IImage>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'URL must be a valid HTTP or HTTPS URL'
      }
    },
    publicId: {
      type: String,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
      min: 0,
    },
    mimeType: {
      type: String,
      required: true,
      enum: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    },
    width: {
      type: Number,
      min: 1,
    },
    height: {
      type: Number,
      min: 1,
    },
    alt: {
      type: String,
      maxlength: 200,
      trim: true,
    },
    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork',
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
ImageSchema.index({ artwork: 1 })
ImageSchema.index({ uploadedBy: 1 })

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema)