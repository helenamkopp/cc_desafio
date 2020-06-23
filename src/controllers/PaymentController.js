var date_ = require('date-fns')
var add = require('date-fns/add')

const mongoose = require('mongoose');

const Payment = mongoose.model('Payment')

module.exports = {
    async index(req, res) {
        const payments = await Payment.find();

        return res.json(payments);
    },
    async store(req, res){
        payment = req.body
        var actual_date = Date.now()
        const value = payment.value
        const type = payment.type
    

        if (type == "debit") {
            payment.status = "received"
            payment.received_date = actual_date
            payment.installments = 0
            payment.fee = (2.8 * value) / 100
            payment.value -= (2.8 * value) / 100
            await Payment.create(payment);

        } else if (type == "credit") {
            payment.status = "expected"
            payment.received_date = add(actual_date, {days: 30})
            payment.installments = 0
            payment.fee = (3.2 * value) / 100 
            payment.value -= (3.2 * value) / 100
            await Payment.create(payment);

        } else if (type == "installment_credit") {
            payment.status = "expected"
            installments = payment.installments
            payment.received_date = actual_date
            if (installments >= 2 && installments <= 6) {
                payment.fee = (3.8 * value) / 100 
                payment.value -= (3.8 * value) / 100
            } else if (installments >= 7 && installments <= 12) {
                payment.fee = (4.2 * value) / 100 
                payment.value -= (4.2 * value) / 100
            }
            
            for( var installment_number=1;  installment_number<= installments; installment_number++){
                payment.received_date = add(payment.received_date, {days: 30})
                await Payment.create(payment);
            }

        }

        return res.json(payment);
    },
    async show(req, res){
        const payment = await Payment.findById(req.params.id);

        return res.json(payment);
    },
    async update(req, res){
        
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true});

        return res.json(payment);
    },
    async destroy(req, res){
        await Payment.findByIdAndRemove(req.params.id);

        return res.send();
    }
};