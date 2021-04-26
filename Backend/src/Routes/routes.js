const express = require('express');
const app = express();
const router = express.Router()
const bodyparser = require('body-parser');
const Admin = require('../Schema/AdminSchema');
const ServicePartner = require('../Schema/ServicePartnerSchema')
const Category = require('../Schema/CategorySchema')
const Service = require('../Schema/ServiceSchema')
var jwt = require('jsonwebtoken');
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});
router.use(bodyparser.urlencoded({ extended: false }))
router.use(express.json())
require('dotenv').config();

const nodemailer = require('nodemailer');

///Your account registration is completed. We will update services to your account and notify you accordingly.
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

router.get('/', (req, res) => {
  res.send('helllo from backend')
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*router.post('/logindata', (req, res) => {
console.log(req.body.loginid);

Admin.find({ loginid: req.body.loginid })
.then((data) => {
 console.log(data, "this login id already exists ");
 if (data == "") { res.send('data recieved').status(201); }
 else res.send(`this data ${data} alredy exist`)
})
.catch((err) => { console.log(err); })

})*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/AdminData', (req, res) => {

  Admin.find().then((data) => { res.send(data); }).catch((err) => { throw err })
})
router.get('/AdminData/:Name', (req, res) => {
  console.log(req.params.Name);
  Admin.find({
    $or: [
      { Name: { "$regex": req.params.Name, $options: 'i' } },
      { Email: { "$regex": req.params.Name, $options: 'i' } }
    ]
  }).then((data) => { res.send(data); console.log(data) }).catch((err) => { console.log(err) })

})

router.post('/AdminData/Login', async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await Admin.login(Email, Password);
    const accesstoken = jwt.sign(user.id, 'Secret');
    console.log(accesstoken)
    res.status(200).json({ accesstoken: accesstoken });

  }
  catch (err) {
    console.log(err);
    res.status(400).json({})
  }

}
)

router.delete('/AdminData', (req, res) => {
  console.log(req.body);
  Admin.deleteOne({ _id: req.body._id }).then((data) => { res.send(data); console.log(data); }).catch((err) => { console.log(err) })
})


router.post('/AdminData', (req, res) => {
  console.log(req.body);
  const user = new Admin(req.body)
  user.save()
    .then((result) => {
      console.log(result);

      let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.Email}`,
        subject: 'Ahya Team',
        html: `<p>Hello ${req.body.Name},</p><br/><p> You have been invited to become the Ahya member. Click on the following link to set your account password and activate your account.</p>
        <a href="http://localhost:3000/admin/pass_conform">click here </a>`
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log('Error occurs');
        }
        console.log('Email sent!!!');
      });

      res.send('Data received').status(201)
    })
    .catch((err) => { console.log(err); res.send("Some error Occured").status(400) })
})

router.put('/AdminData', (req, res) => {

  async function Update() {
    try {
      let data = req.body;
      console.log(data)
      let jay = await Admin.updateOne({ _id: req.body._id }, {
        $set: {
          Name: data.Name,
          Status: data.Status,
          Userrole: data.Userrole
        }
      });
      console.log(jay)
    }
    catch (err) {
      console.log(err)
    }

  }
  Update();
})
//Admin/Password_Comformation
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/AdminData/Password_Comformation', (req, res) => {
  console.log(req.body);
  Admin.updateOne({ Email: req.body.Email }, {
    $set: {
      Password: req.body.Password1,
      Status: "Active",

    }
  })
    .then((data) => { console.log(data); res.send('Password recorded successfully') })
    .catch((err) => { console.log(err) })
})

router.put('/ServicePartnerData/Password_Comformation', (req, res) => {
  console.log(req.body);
  ServicePartner.updateOne({ Email: req.body.Email }, {
    $set: {
      Password: req.body.Password1,
      Status: "Active",

    }
  })
    .then((data) => {
      console.log(data);

      let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.Email}`,
        subject: 'Ahya Team',
        html: `<p> <p>Hello,</p><br/>Your account registration is completed. We will update services to your account and notify you accordingly. </p>`
      };


      // Step 3
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log('Error occurs');
        }
        console.log('Email sent!!!');
      });

      res.send('Password recorded successfully')
    })
    .catch((err) => { console.log(err) })
})
/////////////////////////////////////////////////////////////////////////////////////////
router.get('/ServicePartnerData', (req, res) => {

  ServicePartner.find().then((data) => { res.send(data); console.log(data); }).catch((err) => { console.log(err) })
})

router.get('/ServicePartnerData/:Name', (req, res) => {
  console.log(req.params.Name);
  ServicePartner.find({
    $or: [
      { Name: { "$regex": req.params.Name, $options: 'i' } },
      { Email: { "$regex": req.params.Name, $options: 'i' } }
    ]
  }).then((data) => { res.send(data); console.log(data) }).catch((err) => { console.log(err) })


})

router.post('/ServicePartnerData', (req, res) => {
  console.log(req.body);
  const user = new ServicePartner(req.body)
  user.save()
    .then((result) => {
      console.log(result);
      let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.Email}`,
        subject: 'Ahya Team',
        html: `<p> You have been invited to become the Ahya  Service Partner. Click on the following link to set your account password and activate your account.</p>
      <a href="http://localhost:3000/service/pass_conform">click here </a>`
      };


      // Step 3
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log('Error occurs');
        }
        console.log('Email sent!!!');
      });

      res.send('Data received').status(201)
    })
    .catch((err) => { console.log(err); res.send("Some error Occured").status(400) })
})
router.put('/ServicePartnerData', (req, res) => {
  console.log(req.body);
  ServicePartner.updateOne({ _id: req.body._id }, {
    $set: {
      Name: req.body.Name,
      StoreAddress: req.body.StoreAddress,
      VatNumber: req.body.VatNumber,
      ContactNumber: req.body.ContactNumber,
      Category: req.body.Category,
    }
  })
    .then((data) => { console.log(data); res.send('Changes recorded successfully') })
    .catch((err) => { console.log(err) })
})
router.delete('/ServicePartnerData', (req, res) => {
  console.log(req.body);
  ServicePartner.deleteOne({ _id: req.body._id }).then((data) => { res.send("Deleted succesfullly"); console.log(data); }).catch((err) => { throw err })
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/CategoryData', (req, res) => {

  Category.find().then((data) => { res.send(data); }).catch((err) => { console.log(err) })
})


router.delete('/CategoryData', (req, res) => {
  console.log(req.body);
  Category.deleteOne({ _id: req.body._id }).then((data) => { res.send("Deleted Successfully"); console.log(data); }).catch((err) => { console.log(err) })
})

router.post('/CategoryData', (req, res) => {
  console.log(req.body);
  const user = new Category(req.body)
  user.save().then((result) => { console.log(result); res.send('Data received').status(201) }).catch((err) => { console.log(err); res.send("Some error Occured").status(400) })
})
router.put('/CategoryData', (req, res) => {
  console.log(req.body);
  Category.updateOne({ _id: req.body._id }, {
    $set: {
      CategoryName: req.body.CategoryName,
      Status: req.body.Status,
      ImageURL: req.body.ImageURL,
      Keywords: req.body.Keywords,

    }
  })
    .then((data) => { console.log(data); res.send('Changes recorded successfully') })
    .catch((err) => { console.log(err) })
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/ServiceData', (req, res) => {

  Service.find().then((data) => { res.send(data); }).catch((err) => { console.log(err) })
})


router.delete('/ServiceData', (req, res) => {
  console.log(req.body);
  Service.deleteOne({ _id: req.body._id }).then((data) => { res.send("Deleted Successfully"); console.log(data); }).catch((err) => { console.log(err) })
})

router.post('/ServiceData', (req, res) => {
  console.log(req.body);
  const user = new Service(req.body)
  user.save().then((result) => { console.log(result); res.send('Data received').status(201) }).catch((err) => { console.log(err); res.send("Some error Occured").status(400) })
})
router.put('/ServiceData', (req, res) => {
  console.log(req.body);
  Service.updateOne({ _id: req.body._id }, {
    $set: {
      ServiceName: req.body.ServiceName,
      Status: req.body.Status,
      ImageURL: req.body.ImageURL,
      Keywords: req.body.Keywords,

    }
  })
    .then((data) => { console.log(data); res.send('Changes recorded successfully') })
    .catch((err) => { console.log(err) })
})





module.exports = router;
