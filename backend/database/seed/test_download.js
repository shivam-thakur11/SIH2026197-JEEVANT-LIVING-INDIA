const https = require('https');
const fs = require('fs');
const path = require('path');

const testUrl = 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&q=80';
const dest = path.join(__dirname, 'test_img.jpg');

https.get(testUrl, (res) => {
  console.log('Status code:', res.statusCode);
  if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
    console.log('Redirecting to:', res.headers.location);
    https.get(res.headers.location, (res2) => {
      const stream = fs.createWriteStream(dest);
      res2.pipe(stream);
      stream.on('finish', () => {
        console.log('Downloaded redirected file, size:', fs.statSync(dest).size);
        fs.unlinkSync(dest);
      });
    });
  } else {
    const stream = fs.createWriteStream(dest);
    res.pipe(stream);
    stream.on('finish', () => {
      console.log('Downloaded file, size:', fs.statSync(dest).size);
      fs.unlinkSync(dest);
    });
  }
}).on('error', (err) => {
  console.error('Download error:', err.message);
});
