export interface User {
  id: string
  email: string
  name?: string
  username?: string
  image?: string
  bio?: string
  location?: string
  website?: string
  social?: Record<string, string>
  role: 'USER' | 'ARTIST' | 'ADMIN'
  createdAt: Date
  updatedAt: Date
}

export interface Image {
  id: string
  url: string
  width?: number
  height?: number
  alt?: string
  artworkId: string
  order: number
}

export interface Artwork {
  id: string
  title: string
  slug: string
  description?: string
  authorId: string
  author: User
  images: Image[]
  tags: string[]
  likeCount: number
  commentCount: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}

export interface Like {
  id: string
  userId: string
  artworkId: string
  createdAt: Date
}

export interface Comment {
  id: string
  content: string
  authorId: string
  author: User
  artworkId: string
  parentId?: string
  createdAt: Date
  editedAt?: Date
}

export interface ArtworkFormData {
  title: string
  description?: string
  images: File[]
  tags: string[]
  isPublished: boolean
}