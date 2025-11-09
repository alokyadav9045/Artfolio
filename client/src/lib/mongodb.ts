import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
  isConnected: boolean
}

declare global {
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null, isConnected: false }

if (!global.mongoose) {
  global.mongoose = cached
}

async function dbConnect() {
  // Return existing connection if available
  if (cached.conn && cached.isConnected) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Enable buffering to prevent immediate failures
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 15000, // Keep trying to send operations for 15 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      // SSL/TLS options for better compatibility
      ssl: true,
      tls: true,
      tlsInsecure: false,
      // Connection retry options
      maxIdleTimeMS: 30000,
      retryWrites: true,
      retryReads: true,
      // Additional options for better error handling
      heartbeatFrequencyMS: 10000,
      serverMonitoringMode: 'poll' as const,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      cached.isConnected = true
      console.log('✅ Connected to MongoDB')
      return mongoose
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message)
      cached.isConnected = false
      // Reset the promise so we can retry
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
    cached.isConnected = true
  } catch (e) {
    cached.promise = null
    cached.isConnected = false
    console.error('❌ Failed to connect to MongoDB:', e)
    throw e
  }

  return cached.conn
}

// Check if database is available
export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    // Use existing connection if available
    if (cached.conn && cached.isConnected) {
      return true
    }

    // Try to connect with shorter timeout for quick check
    await dbConnect()
    return cached.isConnected
  } catch (error) {
    console.warn('Database availability check failed:', error instanceof Error ? error.message : 'Unknown error')
    return false
  }
}

// Safe database operation wrapper
export async function withDatabase<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T> {
  try {
    // Try to establish connection
    await dbConnect()
    
    // Execute the operation
    return await operation()
  } catch (error) {
    console.error('Database operation failed:', error instanceof Error ? error.message : 'Unknown error')
    
    // Use fallback if provided
    if (fallback !== undefined) {
      console.log('Using fallback data due to operation failure')
      return fallback
    }
    
    throw error
  }
}

// Export a promise that resolves to the MongoClient compatible with NextAuth
export const clientPromise = (async () => {
  try {
    return await MongoClient.connect(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      maxIdleTimeMS: 30000,
      retryWrites: true,
      retryReads: true,
    })
  } catch (error) {
    console.error('Failed to create MongoDB client:', error)
    // Return a rejected promise that won't cause unhandled rejections
    return Promise.reject(error)
  }
})()

// Export a promise that resolves to mongoose for database operations
export const mongoosePromise = (async () => {
  try {
    return await mongoose.connect(MONGODB_URI, {
      bufferCommands: true, // Enable buffering
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      maxIdleTimeMS: 30000,
      retryWrites: true,
      retryReads: true,
    })
  } catch (error) {
    console.error('Failed to create Mongoose connection:', error)
    // Return a rejected promise that won't cause unhandled rejections
    return Promise.reject(error)
  }
})()

export default dbConnect