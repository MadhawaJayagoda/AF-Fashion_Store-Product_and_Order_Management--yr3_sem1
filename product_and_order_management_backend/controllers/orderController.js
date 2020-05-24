const express = require('express');
const router = express.Router();
const orderSchema = require('../utils/db_schemas/order_schema');

//Retrieve all the orders with their details
router.get('/', async (req, res) => {
    try {
        const orders = await orderSchema.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json({message : err});
    }
});

//Retrieve order by ID
router.get('/:orderId', async (req, res) => {
    try {
        const orderID = req.params.orderId;
        const specificOrder = await orderSchema.findById(orderID);
        res.status(200).json(specificOrder);
    }catch(err){
        res.status(500).json({message : err});
    }
});

//Retrieve Orders by customer/supplier name
// You can use either first name or last name to search the customer or the supplier
router.get('/party/partyName', async (req, res) => {
   try{
       const partyName = req.body.partyName;
       const ordersByParty = await orderSchema.find({ partyName: { $regex : partyName , $options : "i" }}).sort({ order_placementDate : 'DESC'});
       res.status(200).json(ordersByParty);
   }catch(err){
       res.status(500).json({message : err});
   }
});

//Add a new order
router.post('/', async (req, res) => {
    const orderProductName = req.body.order_productName;
    const orderType = req.body.order_type;
    const partyNameVal = req.body.partyName;
    const orderProductCategory = req.body.order_productCategory;
    let productUnitPrice = req.body.productUnitPrice;
    const orderQuantity = req.body.order_quantity;
    let orderTotalDiscountAllowed = req.body.order_discount;
    let orderPaymentStatus = req.body.order_paymentStatus;
    const orderDescription = req.body.order_description;

    (orderPaymentStatus == "Paid" || orderPaymentStatus == "paid" || orderPaymentStatus.toUpperCase() == "paid".toUpperCase() || orderPaymentStatus) ? orderPaymentStatus = true : orderPaymentStatus = false;
    orderTotalDiscountAllowed === undefined ? orderTotalDiscountAllowed = 0 : orderTotalDiscountAllowed;

    // Total payment calculation to/by the party based on quantity and the unit price
    let totalPayment = ( productUnitPrice * orderQuantity);

    if( orderTotalDiscountAllowed != 0 && orderTotalDiscountAllowed !== undefined){
        let totalDiscountValue = (totalPayment) * (orderTotalDiscountAllowed / 100);
        totalPayment = totalPayment - totalDiscountValue;
    }

    //unit price with 2 decimal places
    productUnitPrice = productUnitPrice.toFixed(2);

    //total payment after deducing the discount
    totalPayment = parseFloat(totalPayment.toString());
    totalPayment = totalPayment.toFixed(2);          //Rounding the float totalPayment to 2 decimal places


    const order = new orderSchema({
        order_productName: orderProductName,
        order_type : orderType,
        partyName : partyNameVal,
        order_productCategory : orderProductCategory,
        productUnitPrice : productUnitPrice,
        ordered_quantity : orderQuantity,
        order_discountAllowed : orderTotalDiscountAllowed,
        order_totalPayment : totalPayment,
        order_paymentStatus : orderPaymentStatus,
        order_description : orderDescription
    });

    await order.save().then( data => {
        res.status(200).json(data);
    }).catch( err => {
       res.status(500).json({ Error : err.message });
    });

});

//Updating an order
router.put('/:orderId', async(req, res) => {

    const orderId = req.params.orderId;
    const orderProductName = req.body.order_productName;
    const orderType = req.body.order_type;
    const partyNameVal = req.body.partyName;
    const orderProductCategory = req.body.order_productCategory;
    let productUnitPrice = req.body.productUnitPrice;
    const orderQuantity = req.body.order_quantity;
    let orderTotalDiscountAllowed = req.body.order_discount;
    let orderPaymentStatus = req.body.order_paymentStatus;
    const orderDescription = req.body.order_description;

    orderTotalDiscountAllowed === undefined ? orderTotalDiscountAllowed = 0 : orderTotalDiscountAllowed;

    // Total payment calculation to/by the party based on quantity and the unit price
    let totalPayment = ( productUnitPrice * orderQuantity);

    if( orderTotalDiscountAllowed != 0 && orderTotalDiscountAllowed !== undefined){
        let totalDiscountValue = (totalPayment * orderTotalDiscountAllowed) / 100;
        totalPayment = totalPayment - totalDiscountValue;
    }

    //unit price with 2 decimal places
    productUnitPrice = parseFloat(productUnitPrice.toString()).toFixed(2);

    totalPayment = parseFloat(totalPayment.toString());
    totalPayment = totalPayment.toFixed(2);          //Rounding the float totalPayment to 2 decimal places


    await orderSchema.findByIdAndUpdate( orderId, { $set: {
            order_productName: orderProductName,
            order_type : orderType,
            partyName : partyNameVal,
            order_productCategory : orderProductCategory,
            productUnitPrice : productUnitPrice,
            ordered_quantity : orderQuantity,
            order_discountAllowed : orderTotalDiscountAllowed,
            order_totalPayment : totalPayment,
            order_paymentStatus : orderPaymentStatus,
            order_description : orderDescription
        }},
        { new: true})
        .then( docs => {
            res.status(200).json(docs);
        })
        .catch( err => {
            res.status(500).json({ Error_message : err});
        });
});

//Deleting an order by orderId
router.delete('/:orderId', async(req, res) => {
   let orderID = req.params.orderId;
   try {
       const deletedOrder = await orderSchema.findByIdAndDelete(orderID);
       res.status(200).json(deletedOrder);
   }catch(err){
       res.status(500).json({message : err});
   }
});

module.exports = router;