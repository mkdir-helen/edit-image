require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cloudinary = require('cloudinary');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const uuidv4 = require('uuid/v4');
require('./handlers/cloudinary');
const upload = require('./handlers/multer');
const db = require('./models/db');
const User = require('./models/User');
const Image = require('./models/Image');
const Demo = require('./models/Demo');
const uploadForm = require('./views/UploadForm');
const loginForm = require('./views/LoginForm');
const registerForm = require('./views/RegisterForm');
const publicID = require('./tools/publicID');

app.use(
  session({
    store: new pgSession({
      pgPromise: db
    }),
    secret: 'what',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  })
);

app.use((req, res, next) => {
  let isLoggedIn = req.session.user ? true : false;
  console.log(isLoggedIn);
  next();
});

function protectRoute(req, res, next) {
  let isLoggedIn = req.session.user ? true : false;
  if (isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}


app.get('/', (req, res) => {
  res.send(uploadForm());
});

app.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file);
  console.log('req.file');
  let date = new Date().toISOString();
  let uuidtitle = req.body.title + uuidv4();
  let uuidnontitle = req.file.originalname.substring(0, req.file.originalname.length - 4) + uuidv4();
  let title = req.body.title ? req.body.title : uuidnontitle;
  let folder = req.session.user ? req.session.user.username : 'demo';
  const result = await cloudinary.v2.uploader.upload(req.file.path, { public_id: `${folder}/${title}` },
    function (error, result) { console.log(result, error) }
  );
  if (req.session.user) {
    Image.addImage(title, result.secure_url, req.session.user.id)
      .then(result => { console.log(result); res.redirect('/edit'); });
  } else {
    Demo.addDemo(title, folder, result.secure_url, null)
      .then(result => { console.log(result); res.redirect('/edit'); });
  }
});

app.post('/update', upload.single('image'), async (req, res) => {

  const result = await cloudinary.v2.uploader.upload(req.file.path, { public_id: req.body.public_id },
    function (error, result) { console.log(result, error) }
  );
  // const result = await cloudinary.v2.uploader.upload(req.file.path,
  //   {public_id: req.body.public_id, invalidate: true},
  //   function(error, result) {console.log(result, error)});

  if (req.session.user) {
    Image.addImage(req.body.title, result.secure_url, req.session.user.id)
      .then(Image.getByUser(req.session.user.id)
        .then(result => {
          res.send(result);
        }))
  } else {
    Demo.addDemo(req.body.title, req.body.folder, result.secure_url, null)
      .then(
        Demo.getAll()
          .then(result => {
            res.send(result);
          })
      )
  }
})

app.post('/delete', (req, res) => {
  console.log('console loggin important things!!!!!');
  console.log(req.body.publicID);
  console.log(req.body.url);
  cloudinary.v2.uploader.destroy(`${req.body.publicID}`,
    { invalidate: true }, function (error, result) { console.log(result, error) });
  if (req.session.user) {
    Image.deleteByUrl(req.body.url)
      .then(result => {
        res.send(result);
      })
  } else {
    Demo.deleteByUrl(req.body.url)
      .then(result => {
        res.send(result);
      })
  }
})

app.get('/edit', (req, res) => {
  if (req.session.user) {
    res.redirect(`/${req.session.user.username}/edit`);
  } else {
    Demo.getAll()
      .then(result => {
        res.send(result);
      })
  }
});
app.get('/:user/edit', protectRoute, (req, res) => {
  Image.getByUser(req.session.user.id)
    .then(result => {
      res.send(result);
    });
})

app.get('/active', (req, res) => {
  if (req.session.user) {
    res.send(true);
  } else {
    res.send(false);
  }
})

app.get('/gallery', protectRoute, (req, res) => {
  console.log(req.session);
  res.redirect(`/${req.session.user.username}/gallery`);
});

app.get('/:user/gallery', protectRoute, (req, res) => {
  console.log(req.params.user);
  Image.getByUser(req.session.user.id)
    .then(result => {
      res.send(result);
    });
});

app.get('/photo/:photoID', protectRoute, (req, res) => {
  Image.getById(req.params.photoID)
    .then(result => {
      console.log(result);
      res.send(result);
    })
})
app.get('/editspecial/:photoID', protectRoute, (req, res) => {
  Image.getById(req.params.photoID)
    .then(result => {
      console.log(result);
      res.send(result);
    })
})


app.delete('/photo/:photoID', protectRoute, (req, res) => {
  Image.getById(req.params.photoID)
    .then(result => {
      console.log(result);
      const pubID = publicID(result.url);
      console.log(pubID);
      cloudinary.v2.uploader.destroy(`${pubID}`,
        { invalidate: true }, function (error, result) { console.log(result, error) });
    })
  Image.deleteById(req.params.photoID)
    .then(result => {
      console.log(result);
      res.send(result);
    })
})



// app.get('/:photo', (req,res)=> {
//   res.send('get the photo by itself');
// });

// app.get('/:photo/edit', (req,res)=> {
//   res.send('edit photo');
// });

app.get('/login', (req, res) => {
  res.send(loginForm());
})

app.post('/login', (req, res) => {
  User.getByUsername(req.body.username)
    .then(user => {
      let didMatch = user.checkPassword(req.body.password, user.password);
      if (didMatch) {
        req.session.user = user;
        console.log(req.session.user);
        // req.session.returnTo = req.originalUrl;
        // console.log(req.session.returnTo);
        res.redirect('/gallery');
      } else {
        res.redirect('/login');
      }
    });
});

app.get('/register', (req, res) => {
  res.send(registerForm());
})

app.post('/register', (req, res) => {
  User.addUser(
    req.body.name,
    req.body.email,
    req.body.username,
    req.body.password
  )
    .then(user => {
      req.session.user = user;
      // console.log(req.session);
      // req.session.returnTo = req.originalUrl;
      res.redirect('/gallery');
    })
});








app.post('/logout', (req, res) => {
  req.session.destroy();
  // req.session.returnTo = null;

  res.redirect('/');
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