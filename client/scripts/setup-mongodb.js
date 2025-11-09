#!/usr/bin/env node

/**
 * MongoDB Setup Helper for Artfolio
 *
 * This script helps you set up MongoDB for local development.
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

console.log('🚀 Artfolio MongoDB Setup Helper')
console.log('================================\n')

const platform = os.platform()

// Check if MongoDB is installed
function checkMongoDB() {
  try {
    execSync('mongod --version', { stdio: 'pipe' })
    console.log('✅ MongoDB is installed')
    return true
  } catch (error) {
    console.log('❌ MongoDB is not installed')
    return false
  }
}

// Check if MongoDB service is running (Windows)
function checkMongoDBServiceWindows() {
  try {
    execSync('sc query MongoDB', { stdio: 'pipe' })
    console.log('✅ MongoDB service is running')
    return true
  } catch (error) {
    console.log('❌ MongoDB service is not running')
    return false
  }
}

// Check if MongoDB service is running (Unix)
function checkMongoDBServiceUnix() {
  try {
    execSync('pgrep mongod', { stdio: 'pipe' })
    console.log('✅ MongoDB service is running')
    return true
  } catch (error) {
    console.log('❌ MongoDB service is not running')
    return false
  }
}

// Start MongoDB service (Windows)
function startMongoDBWindows() {
  try {
    console.log('🔄 Attempting to start MongoDB service...')
    execSync('net start MongoDB', { stdio: 'inherit' })
    console.log('✅ MongoDB service started')
    return true
  } catch (error) {
    console.log('❌ Failed to start MongoDB service automatically')
    console.log('Please start MongoDB manually:')
    console.log('  - Windows: net start MongoDB')
    console.log('  - Or run: mongod --dbpath "C:\\data\\db"')
    return false
  }
}

// Start MongoDB service (macOS with Homebrew)
function startMongoDBMacOS() {
  try {
    console.log('🔄 Attempting to start MongoDB service...')
    execSync('brew services start mongodb/brew/mongodb-community', { stdio: 'inherit' })
    console.log('✅ MongoDB service started')
    return true
  } catch (error) {
    console.log('❌ Failed to start MongoDB service automatically')
    console.log('Please start MongoDB manually:')
    console.log('  - macOS (Homebrew): brew services start mongodb/brew/mongodb-community')
    return false
  }
}

// Start MongoDB service (Linux)
function startMongoDBLinux() {
  try {
    console.log('🔄 Attempting to start MongoDB service...')
    execSync('sudo systemctl start mongod', { stdio: 'inherit' })
    console.log('✅ MongoDB service started')
    return true
  } catch (error) {
    console.log('❌ Failed to start MongoDB service automatically')
    console.log('Please start MongoDB manually:')
    console.log('  - Linux: sudo systemctl start mongod')
    return false
  }
}

// Create .env.local with local MongoDB URI
function updateEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local')
  const localUri = 'MONGODB_URI=mongodb://localhost:27017/artfolio'

  try {
    let envContent = ''

    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8')
      // Replace existing MONGODB_URI
      envContent = envContent.replace(
        /MONGODB_URI=.*/,
        localUri
      )
    } else {
      envContent = localUri + '\n'
    }

    fs.writeFileSync(envPath, envContent)
    console.log('✅ Updated .env.local with local MongoDB URI')
    return true
  } catch (error) {
    console.log('❌ Failed to update .env.local:', error.message)
    return false
  }
}

// Install MongoDB on Windows using Chocolatey
function installMongoDBWindows() {
  console.log('📦 Installing MongoDB for Windows...')

  // Check if Chocolatey is installed
  try {
    execSync('choco --version', { stdio: 'pipe' })
    console.log('✅ Chocolatey is available')
  } catch (error) {
    console.log('❌ Chocolatey is not installed')
    console.log('Please install Chocolatey first by running PowerShell as Administrator:')
    console.log('Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://chocolatey.org/install.ps1\'))')
    console.log('\nThen run this setup script again.')
    return false
  }

  try {
    console.log('Installing MongoDB via Chocolatey...')
    execSync('choco install mongodb -y', { stdio: 'inherit' })
    console.log('✅ MongoDB installed successfully')

    // Refresh environment variables
    try {
      execSync('refreshenv', { stdio: 'inherit' })
    } catch (e) {
      // refreshenv might not be available, continue
    }

    return true
  } catch (error) {
    console.log('❌ Failed to install MongoDB via Chocolatey')
    console.log('Please download and install manually from: https://www.mongodb.com/try/download/community')
    return false
  }
}

// Main setup function
async function setup() {
  console.log('1. Checking MongoDB installation...')
  const isInstalled = checkMongoDB()

  if (!isInstalled) {
    if (platform === 'win32') {
      console.log('\n📦 Installing MongoDB for Windows...')
      const installed = installMongoDBWindows()
      if (!installed) {
        process.exit(1)
      }
    } else {
      console.log('\n📦 Please install MongoDB first:')
      console.log('   - macOS: brew install mongodb/brew/mongodb-community')
      console.log('   - Ubuntu: sudo apt-get install mongodb')
      console.log('   - Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest')
      process.exit(1)
    }
  }

  console.log('\n2. Checking MongoDB service...')
  let isRunning = false
  if (platform === 'win32') {
    isRunning = checkMongoDBServiceWindows()
  } else {
    isRunning = checkMongoDBServiceUnix()
  }

  if (!isRunning) {
    console.log('\n3. Starting MongoDB service...')
    let started = false
    if (platform === 'win32') {
      started = startMongoDBWindows()
    } else if (platform === 'darwin') {
      started = startMongoDBMacOS()
    } else {
      started = startMongoDBLinux()
    }
    if (!started) {
      process.exit(1)
    }
  }

  console.log('\n4. Updating environment configuration...')
  updateEnvFile()

  console.log('\n🎉 Setup complete!')
  console.log('You can now run: npm run dev')
  console.log('MongoDB will be available at: mongodb://localhost:27017/artfolio')
}

// Run setup if called directly
if (require.main === module) {
  setup().catch(console.error)
}

module.exports = { setup, checkMongoDB, checkMongoDBServiceWindows, checkMongoDBServiceUnix, startMongoDBWindows, startMongoDBMacOS, startMongoDBLinux, updateEnvFile }