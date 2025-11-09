import { getServerSession } from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/lib/models'
import bcrypt from 'bcryptjs'

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Find user by email
          const user = await User.findOne({ email: credentials.email.toLowerCase() })

          if (!user) {
            return null
          }

          // For OAuth users, they might not have a password set
          if (!user.password) {
            return null
          }

          // Verify password
          const isValidPassword = await bcrypt.compare(credentials.password, user.password)

          if (!isValidPassword) {
            return null
          }

          // Return user object for session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            username: user.username,
            role: user.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: async ({ session, user }: { session: any; user: any }) => {
      if (session?.user) {
        session.user.id = user.id
        // Fetch additional user data - with fallback for DB unavailable
        try {
          const dbUser = await User.findById(user.id).select('role username createdAt')
          if (dbUser) {
            session.user.role = dbUser.role
            session.user.username = dbUser.username
            session.user.createdAt = dbUser.createdAt?.toISOString()
          }
        } catch (error) {
          // If DB is unavailable, just return session without extra fields
          console.error('Failed to fetch user data:', error)
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    signUp: '/signup',
  },
  session: {
    strategy: 'jwt' as const,
  },
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  // Get full user data from database
  const user = await User.findOne({ email: session.user.email }).select(
    'id email name username role'
  )

  return user
}

export { authOptions }