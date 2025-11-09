import AWS from 'aws-sdk'

// Configure AWS SDK
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1',
  })
}

const s3 = new AWS.S3()

export interface UploadResult {
  url: string
  key: string
}

export async function uploadToS3(file: Buffer, filename: string, contentType: string): Promise<UploadResult> {
  const key = `artworks/${Date.now()}-${filename}`

  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read',
  }

  const result = await s3.upload(params).promise()

  return {
    url: result.Location,
    key: result.Key,
  }
}

export function getSignedUploadUrl(filename: string, contentType: string): { url: string; fields: Record<string, string> } {
  const key = `artworks/${Date.now()}-${filename}`

  const params = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: key,
    Expires: 3600, // 1 hour
    ContentType: contentType,
    ACL: 'public-read',
  }

  const signedUrl = s3.getSignedUrl('putObject', params)
  const fields = {
    key,
    'Content-Type': contentType,
    'x-amz-acl': 'public-read',
  }

  return { url: signedUrl, fields }
}

// For Cloudinary alternative (uncomment if using Cloudinary)
// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// export async function uploadToCloudinary(file: Buffer, filename: string): Promise<UploadResult> {
//   const result = await new Promise<any>((resolve, reject) => {
//     cloudinary.uploader.upload_stream(
//       { resource_type: 'auto', public_id: `artworks/${Date.now()}-${filename}` },
//       (error, result) => {
//         if (error) reject(error)
//         else resolve(result)
//       }
//     ).end(file)
//   })

//   return {
//     url: result.secure_url,
//     key: result.public_id,
//   }
// }