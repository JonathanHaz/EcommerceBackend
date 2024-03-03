const cloudinary = require('cloudinary')
require('dotenv').config()
      
cloudinary.config({ 
  cloud_name: 'dv5f2qmbb', 
  api_key: '334991337282489', 
  api_secret:  process.env.CloudinaryKey
});

const uploadToCloudinary = (path, folder) =>{
    return cloudinary.v2.uploader.upload(path,
        {folder ,
        resource_type: "auto"})
        .then((data) =>{
            return { url: data.url, public_id: data.public_id};
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports = {uploadToCloudinary}