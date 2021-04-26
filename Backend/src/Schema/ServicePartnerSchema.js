const mongoose = require('mongoose');
const Schema = mongoose.Schema

const dataSchema = new Schema({
    Name: {
        type: String,
        required: true,

    },
    Email: {
        type: String,
        required: true,
        
    },
    ContactNumber: {
        type: Number,
        required: true,

    },
    StoreAddress: {
        type: String,
        required: true,
    },
    VatNumber: {
        type: Number,
        required: true,

    },
    Password: {
        type: String,
        required: true,
        
    },
    Category: {
        type: String,
        required: true,
    },
    Status:{
        type: String,
        required: true,
    }
}, { timestamps: true })
const Userdata = mongoose.model('service-partner', dataSchema)


module.exports = Userdata;