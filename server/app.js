const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorController = require('./controller/error');
const booking = require('./routes/Booking');
const auth = require('./routes/Auth');
const app = express();
const admin = require('./routes/Admin');

app.use(cors());
// check validte
app.use(
   express.json({
      verify: (req, res, buf, encoding) => {
         try {
            JSON.parse(buf);
         } catch (e) {
            res.status(404).send({ message: 'invalid JSON' });
            throw Error('invalid JSON');
         }
      },
   })
);

app.use(express.urlencoded({ extended: true }));

app.use('/api/booking', booking);
app.use('/api/admin',admin);

app.use('/', auth);

app.use(errorController.get404);

mongoose
   .connect(
      'mongodb+srv://Demo:oOtnOfOgqDqbpiv1@atlascluster.ahbin3n.mongodb.net/shop?retryWrites=true'
   )
   .then((result) => {
      app.listen(5000);
   })
   .catch((err) => {
      console.log(err);
   });
