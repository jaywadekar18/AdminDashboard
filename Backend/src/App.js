const express = require('express');
const app = express();
//const dotenv = require('dotenv').config()
var cors = require('cors');
var cookieParser = require('cookie-parser')


const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
require('dotenv').config();




const router = require('./Routes/routes')
const dblink = 'mongodb+srv://jaywadekar18:jaypassword@cluster0.8p6ea.mongodb.net/Ahya?retryWrites=true&w=majority'
mongoose.connect(dblink, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
  .then(() => { console.log("Connected mongoose") })
  .catch((err) => { console.log("nahi zala re kahi tari chuklay", err) })
app.use(cors());
app.use(cookieParser());
app.use(router);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/my-app/build'))

}
app.listen(port, () => { console.log(`Connection successful at ${port}`) })

