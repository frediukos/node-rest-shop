const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,//{ type : String, required: true },
    price: Number//{ type : Number, required: true }
});

module.exports = mongoose.model('Product', productSchema);