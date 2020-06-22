const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required:true,
    },
    installments: {
        type: Number,
        required: false,
    },
    card: {
        number: {
            type: String,
            required: true,
        },
        expiry: {
            type: String,
            required: true,
        },
        cvv: {
            type: String,
            required: true,
        },
        holder: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        required: false,
    },
    received_date: {
        type: String,
        required: false,
    },
});

mongoose.model('Payment', PaymentSchema);