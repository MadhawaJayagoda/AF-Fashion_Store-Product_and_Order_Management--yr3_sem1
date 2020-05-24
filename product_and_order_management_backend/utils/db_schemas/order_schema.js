const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    order_productName : {
        type : String,
        required : true
    },
    order_type : {
        // Customer order or Supplier order
        type :String,
        required: true
    },
    partyName : {
        // Customer or Supplier Name
        type : String,
        required : true
    },
    order_productCategory : {
        // Category of the Product
        type : String,
        required : true
    },
    productUnitPrice : {
        type : String,
        required : true
    },
    ordered_quantity : {
        type : Number,
        required : true
    },
    order_discountAllowed : {
        type : Number,
        required : true
    },
    order_totalPayment : {
        type : String
    },
    order_paymentStatus : {
        // payment maid successfully - true ; else false
        type : Boolean,
        required : true
    },
    order_placementDate : {
        type : Date,
        default : Date.now
    },
    order_description : {
        type : String,
        default: ""
    }
});

module.exports = mongoose.model('orders', orderSchema);