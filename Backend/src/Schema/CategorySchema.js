const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    CategoryName: {
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
const Userdata = mongoose.model('categorie', dataSchema)


module.exports = Userdata;
