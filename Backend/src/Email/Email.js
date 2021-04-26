require('dotenv').config();

const nodemailer = require('nodemailer');


// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD
    }
});


let mailOptions = {
   from: 'jaywadekar18@gmail.com', 
   to: `${req.body.Email}`, 
   subject: 'Ahya Team',
   html: `<p> You have been invited to become the Ahya member. Click on the following link to set your account password and activate your account.</p>
   <a href="http://localhost:3000/admin/pass_conform">click here </a>`
};


// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
         console.log('Error occurs');
    }
    console.log('Email sent!!!');
});