const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cloudinary = require('cloudinary');
require('./handlers/cloudinary');
const upload = require('./handlers/multer');
const db = require('./models/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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