// Import section:
const express = require('express'); //npm install --save express   and now use this package
const app = express(); //execute express to use all kind utilities & methods &...
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products'); // import routes/products
const orderRoutes = require('./api/routes/orders'); // import routes/orders

mongoose.connect(
    "mongodb+srv://node-shop:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-vlo3y.mongodb.net/test?retryWrites=true&w=majority"//,
    // {
    //     useMongoClient: true
    // }
);

app.use(morgan('dev'));  //dev - format for output
app.use(bodyParser.urlencoded({extended: false})); //SUPPORT SIMPLE DATA - FALSE
app.use(bodyParser.json());

app.use((req, res, next) => {   // Fixing CORS error
    res.header("Access-Control-Allow-Origin", "*");  //Course error
    res.header(
        "Access-Control-Allow-Headers', X-Requested-With, Content-Type, Accept,Autorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


// Routs which should handle requests:
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Error handling:
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;