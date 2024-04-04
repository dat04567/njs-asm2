const Users = require('../models/Users');

const jwt = require('jsonwebtoken');

const createToken = () => {
   return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

exports.postSignUp = (req, res, next) => {
   const email = req.body.email;
   const pw = req.body.password;
   Users.create({ email: email, password: pw })
      .then((result) => {
         const token = createToken();
         res.status(201).json({ token: token, user: { email: email } });
      })
      .catch((err) => {
         res.status(500).json({ message: 'Email already extist' });
      });
};

const hanldeLogin = (email, pw, expr, message, res) => {
   Users.findOne({ email: email, password: pw, ...expr})
      .then((result) => {
         if (!result) throw Error();
         res.status(200).json(message);
      })
      .catch((err) => {
         res.status(401).json({
            message: 'Authentication failed, invalid username or password.',
         });
      });
};

exports.postLogin = (req, res, next) => {
   const email = req.body.email;
   const pw = req.body.password;
   const token = createToken();
   const message = {
      message: 'Authentication succeeded.',
      token: token,
      user: { email: email },
   };
   hanldeLogin(email, pw, { isAdmin: { $exists: false } } , message, res);
};

exports.postLoginAdmin = (req, res, next) => {
   const email = req.body.email;
   const pw = req.body.password;
   const token = createToken();
   const message = {
      message: 'Authentication succeeded.',
      token: token,
   };
   hanldeLogin(email, pw, { isAdmin: true }, message , res);
};
