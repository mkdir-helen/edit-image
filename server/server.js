require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cloudinary = require('cloudinary');
require('./handlers/cloudinary');
const upload = require('./handlers/multer');
const db = require('./models/db');
const uploadForm = require('./views/UploadForm');


app.get('/', (req, res) => {
  res.send(uploadForm());
});

app.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  
  const result = await cloudinary.v2.uploader.upload(req.file.path,{public_id: `melon/${req.body.title}`},
    function(error, result){console.log(result, error)}
  );
  // const blog = new Blog()
  // blog.title = req.body.title
  // blog.imageUrl = result.secure_url
  // await blog.save()
  res.send({
    message: 'Image is uploaded'
  })
})

// { public_id: 'melon/baka',
//   version: 1546464113,
//   signature: '271de9bf1337ada36ee75b167ba586e13b1b89be',
//   width: 602,
//   height: 617,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2019-01-02T21:21:53Z',
//   tags: [],
//   bytes: 190350,
//   type: 'upload',
//   etag: '4a3b1b0b8a9bfb950a3c97e0e7f327d7',
//   placeholder: false,
//   url:
//    'http://res.cloudinary.com/melonimage/image/upload/v1546464113/melon/baka.png',
//   secure_url:
//    'https://res.cloudinary.com/melonimage/image/upload/v1546464113/melon/baka.png',
//   access_mode: 'public',
//   original_filename: 'f9ee673da94761fd918c35f5655f60d9' }


// file:
//    { fieldname: 'image',
//      originalname: 'pine2.png',
//      encoding: '7bit',
//      mimetype: 'image/png',
//      destination: '/var/folders/5s/rswm0htn1ljd5fwj6x4lvg_m0000gn/T',
//      filename: '8f344f86a8a2827c8fb2e717d90f93a1',
//      path:
//       '/var/folders/5s/rswm0htn1ljd5fwj6x4lvg_m0000gn/T/8f344f86a8a2827c8fb2e717d90f93a1',
//      size: 19404 } }

// { fieldname: 'image',
//   originalname: 'pine3.png',
//   encoding: '7bit',
//   mimetype: 'image/png',
//   destination: '/var/folders/5s/rswm0htn1ljd5fwj6x4lvg_m0000gn/T',
//   filename: '56f27cf219ebb128e9aed1d7aac68b84',
//   path:
//    '/var/folders/5s/rswm0htn1ljd5fwj6x4lvg_m0000gn/T/56f27cf219ebb128e9aed1d7aac68b84',
//   size: 110566 }



// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, '/uploads')
//   },
//   filename: function(req, file, cb) {
//     console.log(file)
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// app.post('/upload', (req, res, next) => {
//   const upload = multer({ storage }).single('name-of-input-key')
//   upload(req, res, function(err) {
//     if (err instanceof multer.MulterError) {
//       return res.send(err);
//     }else if(err){
//       return res.send(err);
//     }
//     res.json(req.file);
//   })
// })

app.listen(5000, () => {
    console.log('listening on port 5000');
  });