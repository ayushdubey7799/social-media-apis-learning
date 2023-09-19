import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dpm9vbkto',
  api_key: '755143379857359',
  api_secret: 'HKAh53do-NkeT7RmckqCAnzeUYQ',
});

export const uploadImage = async (path) => {
    const res = await cloudinary.uploader.upload(path, (error, result) => {
        if (error) {
          console.error('Error uploading image:', error);
        } else {
          console.log('Image uploaded:', result.url);
        }
      });
   return res.url;
}


