const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
  publicKey: process.env['IMAGEKIT_PUBLIC_KEY'], 
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], 
  urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT']
});

async function uploadFile(fileDataString) { 
    const response = await client.files.upload({
        file: fileDataString, 
        fileName: `image-${Date.now()}.jpg`,
    });
    return response; 
}

module.exports = uploadFile;
