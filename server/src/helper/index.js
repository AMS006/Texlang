const { admin, bucket } = require("../../firebase");

exports.getDownloadUrl = async (path) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file(path);
     const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: expirationDate
    });
    return url;
}

exports.uploadFileToFirebaseStorage = async (file, path) => {
  try {
    if (!file || !path) {
      throw new Error('Missing file or path');
    }

    const fileBuffer = file.buffer;

    const fileRef = bucket.file(path);

    const writeStream = fileRef.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    await new Promise((resolve, reject) => {
      writeStream.on('error', (error) => {
        console.error('Error uploading file:', error);
        reject(error);
      });

      writeStream.on('finish', () => {
        resolve();
      });

      writeStream.end(fileBuffer);
    });

    return `File uploaded to ${path}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
