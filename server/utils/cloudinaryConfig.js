const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dxwjgksdj',
  api_key: '781451799839245',
  api_secret: 'Nv5N6Le8dFU467aAJhvf1iZaLJs',
})

const uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id })
      },
      { resource_type: 'auto' }
    )
  })
}

module.exports = uploads
