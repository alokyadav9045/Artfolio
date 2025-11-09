#!/usr/bin/env node

// Simple test script to verify API routes work with fallback data
const http = require('http');

function testEndpoint(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing API routes with fallback data...\n');

  const endpoints = [
    '/api/stats',
    '/api/artworks?page=1',
    '/api/comments?artworkId=test'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      const result = await testEndpoint(endpoint);
      console.log(`✅ Status: ${result.status}`);
      if (result.status === 200) {
        console.log('✅ API working with fallback data');
        if (typeof result.data === 'object') {
          console.log(`📊 Response keys: ${Object.keys(result.data).join(', ')}`);
        }
      } else {
        console.log(`❌ Unexpected status: ${result.status}`);
        console.log(`📄 Response: ${JSON.stringify(result.data)}`);
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      console.log(`❌ Error code: ${error.code}`);
    }
    console.log('');
  }

  console.log('🎉 Test complete!');
}

runTests().catch(console.error);