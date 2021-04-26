let bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    Name: {
        type: String,
        required: true,

    },
    Userrole: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    }


}, { timestamps: true })

dataSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.Password = await bcrypt.hash(this.Password, salt);
    next();
})


dataSchema.statics.login = async function(Email, Password) {
    const user = await this.findOne({ Email:Email });
    if (user) {
      const auth = await bcrypt.compare(Password, user.Password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };


const Userdata = mongoose.model('admin', dataSchema);


module.exports = Userdata;
