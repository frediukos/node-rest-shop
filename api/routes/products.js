let express = require('express'); // import express
const router = express.Router(); // setup the express router
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

    router.post('/', (req, res, next) => {
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
        });
        product
            .save()
            .then(result => {
                console.log(result);
            })
        .catch(err => console.log(err));
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: product
        });
});  //  /products

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId; //extract product ID
    if (id === 'special') {
        res.status(200).json({
            message: 'You discover the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});


router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
       message: 'Update product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;