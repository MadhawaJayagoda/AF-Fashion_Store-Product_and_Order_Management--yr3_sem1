const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    supllier_name : {
        type : String,
        required : true
    },
    supllier_productName : {
        type : String,
        required: true
    },
    supplier_contactNumber : {
        type : String,
        required : true
    },
    productUnitPrice : {
        type : mongoose.Decimal128,
        required : true
    },
    quantityAdded : {
        type : Number,
        required : true
    },
    totalPayment : {
        type : mongoose.Decimal128,
    },
    paymentMaid : {
        // paid amount
        type : mongoose.Decimal128
    },
    paymentStatus : {
        //    true - if paid    &    false - if not paid yet
        type : Boolean,
    },
    paymentDate : {
        type : Date
    }
});

module.exports = mongoose.model('suppliers', supplierSchema);