/**
 * Cloud Storage Service
 * =====================================================
 * Interface for uploading images (artisan profiles, craft photos, etc.)
 *
 * TODO: Choose one of these storage options and configure:
 *   Option A — Google Cloud Storage (GCS):
 *     npm install @google-cloud/storage
 *     Set GCS_BUCKET_NAME, GCS_PROJECT_ID in .env
 *
 *   Option B — Cloudinary (easier setup for hackathon):
 *     npm install cloudinary
 *     Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env
 * =====================================================
 */

/**
 * Uploads an image file and returns a public URL.
 *
 * @param {Buffer} fileBuffer - File buffer from multer or similar
 * @param {string} filename - Desired filename
 * @param {string} folder - Storage folder (e.g. 'artisans', 'workshops')
 * @returns {Promise<{url: string, isDemoMode: boolean}>}
 */
const uploadImage = async (fileBuffer, filename, folder = 'general') => {
  // TODO: Option A — Google Cloud Storage
  // const { Storage } = require('@google-cloud/storage');
  // const storage = new Storage({ projectId: process.env.GCS_PROJECT_ID });
  // const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);
  // const file = bucket.file(`${folder}/${filename}`);
  // await file.save(fileBuffer, { contentType: 'image/jpeg', public: true });
  // const url = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${folder}/${filename}`;
  // return { url, isDemoMode: false };

  // TODO: Option B — Cloudinary
  // const cloudinary = require('cloudinary').v2;
  // cloudinary.config({ cloud_name: ..., api_key: ..., api_secret: ... });
  // const result = await cloudinary.uploader.upload(fileBuffer, { folder });
  // return { url: result.secure_url, isDemoMode: false };

  console.log('[STORAGE SERVICE] Running in DEMO MODE (no storage configured)');
  return {
    url: `https://placehold.co/400x300?text=${encodeURIComponent(filename)}`,
    isDemoMode: true,
    note: 'Configure GCS or Cloudinary in .env to enable real image uploads.',
  };
};

/**
 * Deletes an image from storage.
 *
 * @param {string} fileUrl - The URL of the file to delete
 * @returns {Promise<{success: boolean, isDemoMode: boolean}>}
 */
const deleteImage = async (fileUrl) => {
  // TODO: Implement actual deletion
  console.log('[STORAGE SERVICE] deleteImage: Running in DEMO MODE');
  return { success: true, isDemoMode: true };
};

module.exports = { uploadImage, deleteImage };
