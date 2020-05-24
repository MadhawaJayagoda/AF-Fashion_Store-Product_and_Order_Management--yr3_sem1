const express = require('express');
const productSchema = require('../utils/db_schemas/product_schema');
const router = express.Router();

//Retrieve all the Products
router.get('/', async(req, res) => {
    try {
        const products = await productSchema.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Brand
router.get('/brand/:brandName', async(req, res) => {
    const brandName  = req.params.brandName;
    try {
        const products = await productSchema.find({ productBrand : { $regex : brandName, $options : "i"}});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Brand sort by added Date ( Latest products of a Brand )
router.get('/brand/latest/:brandName', async(req, res) => {
    const brandName  = req.params.brandName;
    try {
        const products = await productSchema.find({ productBrand : { $regex : brandName, $options : "i"}}).sort({ createdDate : 'desc'});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Brand sort by Rating ( Highest rated products of a Brand )
router.get('/brand/rating/:brandName', async(req, res) => {
    const brandName  = req.params.brandName;
    try {
        const products = await productSchema.find({ productBrand : { $regex : brandName, $options : "i"}}).sort({ product_averageRating : 'desc'});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Category
router.get('/category/:category', async(req, res) => {
    const category = req.params.category;
    try {
        const products = await productSchema.find({ product_category : { $regex : category, $options: "i"} });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Category sorted by date added ( Latest products by category )
router.get('/category/latest/:category', async(req, res) => {
    const category = req.params.category;
    try {
        const products = await productSchema.find({ product_category : { $regex : category, $options: "i"} }).sort({ createdDate : "desc"});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by the Category sorted by the ratings ( Highest rated products )
router.get('/category/rating/:category', async(req, res) => {
    const category = req.params.category;
    try {
        const products = await productSchema.find({ product_category : { $regex : category, $options: "i"}}).sort({ product_averageRating : "desc"});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by Sorting
router.get('/sort/:sort', async(req, res) => {
    const sortParam = req.params.sort;
    try {
        const products = await productSchema.find().sort({ createdDate : "desc"});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Retrieve Products by Rating Sorting
router.get('/sort/rating', async(req, res) => {
    try {
        const products = await productSchema.find().sort({product_averageRating : "desc" });
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ Error_message : err});
    }
});

//Adding a new Product
router.post('/', async(req, res) => {
    const productName =  req.body.product_name;
    const productBrand = req.body.product_brand;
    const productDescription = req.body.product_description;
    const productCategory = req.body.product_category;
    const productUnitPrice = req.body.product_unitprice;
    const productDiscount = req.body.product_discount;
    const productSupplierName = req.body.product_supplierName;
    let productExpirationDate = req.body.product_expirationDate;
    let productAverageRating = req.body.product_averageRating;
    let productExpirationStatus;

    productExpirationDate === undefined || productExpirationDate === null ? (productExpirationDate = "NA", productExpirationStatus = "NA" ): productExpirationDate;
    if( productExpirationDate != "NA" && productExpirationDate != undefined){

        //Calculate the difference between Date.now() and the input Expiration date
        // Based on the above value; expirationStatus could be 'expired' or 'not expired'
        productExpirationStatus = "Status goes here";
    }


    const product = new productSchema({
        productName: productName,
        productBrand: productBrand,
        productDescription: productDescription,
        product_category: productCategory,
        product_unitprice: productUnitPrice,
        product_discount: productDiscount,
        supplier_name: productSupplierName,
        product_expirationDate: productExpirationDate,
        product_expirationStatus: productExpirationStatus,
        product_averageRating : productAverageRating
    });

    await product.save()
    .then( data => {
        res.status(200).json(data);
    }).catch( err => {
        res.status(500).json({ Error : err.message });
    });
});

//updating product details
router.put('/:productId', async(req, res) => {
    const productId = req.params.productId;
    const productName = req.body.product_name;
    const productBrand = req.body.product_brand;
    const productDescription = req.body.product_description;
    const productCategory = req.body.product_category;
    const productUnitPrice = req.body.product_unitprice;
    const productDiscount = req.body.product_discount;
    const productSupplierName = req.body.product_supplierName;
    let productExpirationDate = req.body.product_expirationDate;
    let productAverageRating = req.body.product_averageRating;
    let productExpirationStatus;

    productExpirationDate === undefined || productExpirationDate === null ? (productExpirationDate = "NA", productExpirationStatus = "NA") : productExpirationDate;
    if (productExpirationDate != "NA" && productExpirationDate != undefined) {

        //Calculate the difference between Date.now() and the input Expiration date
        // Based on the above value; expirationStatus could be 'expired' or 'not expired'
        productExpirationStatus = "Status goes here";
    }

    await productSchema.findByIdAndUpdate(productId, {$set : {
            productName: productName,
            productBrand: productBrand,
            productDescription: productDescription,
            product_category: productCategory,
            product_unitprice: productUnitPrice,
            product_discount: productDiscount,
            supplier_name: productSupplierName,
            product_expirationDate: productExpirationDate,
            product_expirationStatus: productExpirationStatus,
            product_averageRating : productAverageRating
        }}, {new : true})
        .then( docs => {
            res.status(200).json(docs);
        }).catch( err => {
            res.status(500).josn({ Error_message : err});
        });
});

//Change or modify the unit price of a Product
router.patch('/productUnitPrice/:productId', async(req, res) => {
    const productId = req.params.productId;
    const unitProice = req.body.product_unitprice;

    await productSchema.findByIdAndUpdate(productId, {$set: { product_unitprice : unitProice }}, {new: true}).then( docs => {
        res.status(200).json(docs);
    }).catch( err => {
        res.status(500).json({ Error_message : err});
    });
});

//Change or modify the discount of a Product
router.patch('/productDiscount/:productId', async(req, res) => {
    const productId = req.params.productId;
    const productDiscount = req.body.product_discount;

    await productSchema.findByIdAndUpdate(productId, {$set: { product_discount : productDiscount }}, {new: true}).then( docs => {
        res.status(200).json(docs);
    }).catch( err => {
        res.status(500).json({ Error_message : err});
    });
});

//Change or modify the Rating of a Product
router.patch('/productRating/:productId/:productRating', async(req, res) => {
    const productId = req.params.productId;
    const productRating = req.params.productRating;

    await productSchema.findByIdAndUpdate(productId, {$set: { product_averageRating : productRating }}, {new: true}).then( docs => {
        res.status(200).json(docs);
    }).catch( err => {
        res.status(500).json({ Error_message : err});
    });
});

//Deleting a Product by productId
router.delete('/:productId', async(req, res) => {
    const productId = req.params.productId;
    try{
        const deletedProduct = await productSchema.findByIdAndDelete(productId);
        res.status(200).json(deletedProduct);
    }catch(err){
        res.status(500).json({Error_message : err});
    }
});


module.exports = router;