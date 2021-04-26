const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    ServiceName: {
        type: String,
        required: true,
          
    },
    ImageURL: {
        type: String,
        required: true,
    },
    Keywords: {
        type: String,
      
    },
    Status: {
        type: String,
        required: true,
    },
    
  

}, { timestamps: true })
const Userdata = mongoose.model('service', dataSchema)


module.exports = Userdata;