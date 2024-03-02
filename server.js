const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/product');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://Zhanel:Alivemax1@cluster0.m1v3wsa.mongodb.net/sport_store?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('index', { products });
});

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/');
});

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('item', { product });
});

app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('edit', { product });
});

app.put('/products/:id', async (req, res) => {
    try {
        const { name, category, price, stockQuantity, additionalInfo, storeID, location, supplierID } = req.body;
        console.log('Updating product:', req.params.id);
        console.log('New data:', req.body);
        await Product.findByIdAndUpdate(req.params.id, { name, category, price, stockQuantity, additionalInfo, storeID, location, supplierID });
        console.log('Product updated successfully');
        res.redirect('/');
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.get('/search', async (req, res) => {
    const { category } = req.query;
    const products = await Product.find({ category });
    res.render('index', { products });
});

app.get('/sort', async (req, res) => {
    const { order } = req.query;
    let sortQuery = { name: order === 'asc' ? 1 : -1 }; // Sort by name in ascending or descending order
    const products = await Product.find().sort(sortQuery);
    res.render('index', { products });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
