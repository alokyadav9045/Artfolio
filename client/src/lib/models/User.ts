import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  emailVerified?: Date
  image?: string
  username?: string
  password?: string
  role: 'USER' | 'ARTIST' | 'ADMIN'
  bio?: string
  website?: string
  location?: string
  resetToken?: string
  resetTokenExpiry?: Date
  createdAt: Date
  updatedAt: Date
  accounts: mongoose.Types.ObjectId[]
  artworks: mongoose.Types.ObjectId[]
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      validate: {
        validator: function(v: string) {
          return /^[a-zA-Z0-9_]+$/.test(v)
        },
        message: 'Username can only contain letters, numbers, and underscores'
      }
    },
    password: {
      type: String,
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ['USER', 'ARTIST', 'ADMIN'],
      default: 'USER',
    },
    bio: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function(v: string) {
          return /^https?:\/\/.+/.test(v)
        },
        message: 'Website must be a valid URL starting with http:// or https://'
      }
    },
    location: {
      type: String,
      maxlength: 100,
      trim: true,
    },
    resetToken: {
      type: String,
      select: false, // Don't include in queries by default
    },
    resetTokenExpiry: {
      type: Date,
      select: false, // Don't include in queries by default
    },
    accounts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account'
    }],
    artworks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artwork'
    }],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Like'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
  },
  {
    timestamps: true,
  }
)

// Create indexes for better query performance
UserSchema.index({ name: 1 })
UserSchema.index({ role: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)