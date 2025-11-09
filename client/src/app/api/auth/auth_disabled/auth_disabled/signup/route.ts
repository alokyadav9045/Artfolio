import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { User } from '@/lib/models'
import { withDatabase } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, username } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Enhanced password validation
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return NextResponse.json(
        { error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' },
        { status: 400 }
      )
    }

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Username validation if provided
    if (username) {
      if (username.length < 3 || username.length > 30) {
        return NextResponse.json(
          { error: 'Username must be between 3 and 30 characters' },
          { status: 400 }
        )
      }
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return NextResponse.json(
          { error: 'Username can only contain letters, numbers, and underscores' },
          { status: 400 }
        )
      }
    }

    return await withDatabase(
      async () => {
        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [
            { email: email.toLowerCase() },
            ...(username ? [{ username: username.toLowerCase() }] : [])
          ]
        })

        if (existingUser) {
          if (existingUser.email === email.toLowerCase()) {
            return NextResponse.json(
              { error: 'An account with this email already exists' },
              { status: 409 }
            )
          }
          if (username && existingUser.username === username.toLowerCase()) {
            return NextResponse.json(
              { error: 'This username is already taken' },
              { status: 409 }
            )
          }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Generate unique username if not provided
        let finalUsername = username
        if (!finalUsername) {
          const baseUsername = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 20)
          let counter = 0
          let tempUsername = baseUsername

          while (await User.findOne({ username: tempUsername })) {
            counter++
            tempUsername = `${baseUsername}${counter}`
          }
          finalUsername = tempUsername
        }

        // Create user
        const user = new User({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password: hashedPassword,
          username: finalUsername,
          role: 'USER',
        })

        await user.save()

        // Return user data (excluding password)
        const userResponse = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          username: user.username,
          role: user.role,
          createdAt: user.createdAt,
        }

        return NextResponse.json(
          {
            message: 'Account created successfully',
            user: userResponse
          },
          { status: 201 }
        )
      },
      // Fallback when database is unavailable
      NextResponse.json(
        { error: 'Database connection unavailable. Please try again later.' },
        { status: 503 }
      )
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}