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


app.post('/delete', (req, res) => {
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

app.get('/username', (req, res) => {
  if (req.session.user) {
    User.getById(req.session.user.id)
      .then(result => {
        console.log(result);
        res.json({ username: result.username });
      })
  } else {
    console.log("No user!!!");
    res.json({ username: '' });
  }
})

app.get('/gallery', protectRoute, (req, res) => {
  console.log(req.session);
  // res.redirect(`/${req.session.user.username}/gallery`);
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



app.get('/login', (req, res) => {
  res.send(loginForm());
})

app.post('/login', (req, res) => {
  User.getByUsername(req.body.username)
    .catch(error => {
      console.log(error);
      console.log("this is error~~~");
      res.json({ message: "user" });
    })
    .then(user => {
      let didMatch = user.checkPassword(req.body.password, user.password);
      if (didMatch) {
        req.session.user = user;
        console.log(req.session.user);
        // req.session.returnTo = req.originalUrl;
        // console.log(req.session.returnTo);
        // res.redirect('/gallery');
        res.json({ message: "ok" });
      } else {
        console.log("this is message when it's not working");
        res.json({ message: "password" });
      }
    });
});

app.get('/register', (req, res) => {
  res.send(registerForm());
})

app.post('/register', (req, res) => {
  User.getByEmail(req.body.email)
    .then(user => {
      if (user.email === req.body.email) {
        res.json({ message: "email" });
      }
    })
  User.getByUsername(req.body.username)
    .then(user => {
      if (user.username === req.body.username) {
        res.json({ message: "username" });
      }
    })
  if (req.body.email === '' || req.body.username === "" || req.body.name === "" || req.body.password === "") {
    res.json({ message: "empty" });
  }
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
      // res.redirect('/gallery');
      res.json({ message: "okay" });
    })
});


app.post('/logout', (req, res) => {
  req.session.destroy();
  // req.session.returnTo = null;

  res.json({
    logout: true
  });
})


app.listen(5000, () => {
  console.log('listening on port 5000');
});