import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// @ts-expect-error NextAuth typing issues with Next.js 15
const handler = NextAuth({
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

        // Simple test authentication
        return {
          id: 'test-user-id',
          email: credentials.email,
          name: 'Test User',
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }