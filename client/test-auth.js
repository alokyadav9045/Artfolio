// Test script to verify authentication flow
// Run with: node test-auth.js

const http = require('http');
const https = require('https');

const BASE_URL = 'http://localhost:3000';

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = {
            status: res.statusCode,
            data: body ? JSON.parse(body) : null,
            body: body
          };
          resolve(response);
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: null,
            body: body,
            parseError: e.message
          });
        }
      });
    });

    req.on('error', (err) => {
      console.log('Request error details:', err.message);
      reject(err);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testSignup() {
  console.log('🧪 Testing signup...');

  const testUser = {
    name: 'Test User',
    username: 'testuser',
    email: 'test@example.com',
    password: 'TestPass123!',
    role: 'artist'
  };

  try {
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/signup',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, testUser);

    if (response.status === 201 || response.status === 200) {
      console.log('✅ Signup successful:', response.data.message);
      return true;
    } else {
      console.log('❌ Signup failed:', response.data?.error || `Status: ${response.status}`);
      console.log('Response body:', response.body);
      return false;
    }
  } catch (error) {
    console.log('❌ Signup error:', error.message);
    console.log('Error details:', error);
    return false;
  }
}

async function testLogin() {
  console.log('🧪 Testing login endpoint availability...');

  try {
    // Just test that the NextAuth endpoint is responding
    const response = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/providers',
      method: 'GET'
    });

    if (response.status === 200) {
      console.log('✅ Auth endpoints are responding');
      return true;
    } else {
      console.log('❌ Auth endpoints not responding:', `Status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Login endpoint error:', error.message);
    console.log('Error details:', error);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting authentication tests...\n');

  // Test signup API
  const signupSuccess = await testSignup();
  console.log('');

  // Test auth endpoints availability
  const loginSuccess = await testLogin();
  console.log('');

  if (signupSuccess && loginSuccess) {
    console.log('🎉 Basic authentication tests passed!');
  } else {
    console.log('⚠️  Some tests failed - check server logs and configuration');
  }

  console.log('\n📋 Manual Testing Checklist:');
  console.log('□ Visit http://localhost:3000/signup');
  console.log('□ Create an account with valid details');
  console.log('□ Verify form validation (try invalid inputs)');
  console.log('□ Visit http://localhost:3000/login');
  console.log('□ Sign in with the created account');
  console.log('□ Verify error handling with wrong credentials');
  console.log('□ Check if you can access http://localhost:3000/profile');
  console.log('□ Test password reset at http://localhost:3000/forgot-password');
  console.log('□ Try the reset password flow (requires email config)');

  console.log('\n🔧 Configuration Check:');
  console.log('□ MongoDB connection working');
  console.log('□ Environment variables loaded');
  console.log('□ NextAuth configured correctly');
  console.log('□ Email service configured (for password reset)');

  console.log('\n💡 Tips:');
  console.log('- Check server console for detailed error messages');
  console.log('- Use browser dev tools to inspect network requests');
  console.log('- Test with different browsers/devices');
  console.log('- Verify session persistence across page reloads');
}

runTests().catch(console.error);