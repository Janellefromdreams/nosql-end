const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    stockQuantity: Number,
    additionalInfo: String,
    storeID: String,
    location: String,
    supplierID: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
