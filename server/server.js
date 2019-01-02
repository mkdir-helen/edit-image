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
  res.render('index');
  // res.send(uploadForm);
});

app.post('/upload', upload.single('image'), async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  // const blog = new Blog()
  // blog.title = req.body.title
  // blog.imageUrl = result.secure_url
  // await blog.save()
  res.send({
    message: 'Image is uploaded'
  })
})

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