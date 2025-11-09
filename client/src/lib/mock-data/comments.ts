export interface MockComment {
  id: string
  content: string
  author: {
    name: string
    avatar: string
    username: string
  }
  artwork: {
    id: string
    title: string
    image: string
  }
  createdAt: string
  likes: number
  isLiked: boolean
  isReported: boolean
}

export const mockComments: MockComment[] = [
  {
    id: '1',
    content: 'Absolutely stunning work! The colors and composition are incredible.',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      username: 'sarah_art_lover'
    },
    artwork: {
      id: '1',
      title: 'Sunset Dreams',
      image: '/artworks/sunset.jpg'
    },
    createdAt: '2025-11-08T10:30:00Z',
    likes: 5,
    isLiked: false,
    isReported: false
  },
  {
    id: '2',
    content: 'Love the perspective! How long did it take you to create this?',
    author: {
      name: 'Mike Johnson',
      avatar: '/avatars/mike.jpg',
      username: 'mike_designer'
    },
    artwork: {
      id: '2',
      title: 'Urban Reflections',
      image: '/artworks/urban.jpg'
    },
    createdAt: '2025-11-07T15:45:00Z',
    likes: 3,
    isLiked: true,
    isReported: false
  },
  {
    id: '3',
    content: 'This piece speaks to my soul. Thank you for sharing your talent.',
    author: {
      name: 'Emma Wilson',
      avatar: '/avatars/emma.jpg',
      username: 'emma_artist'
    },
    artwork: {
      id: '3',
      title: 'Fantasy Character',
      image: '/artworks/fantasy.jpg'
    },
    createdAt: '2025-11-06T09:15:00Z',
    likes: 8,
    isLiked: false,
    isReported: false
  }
]