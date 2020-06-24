

const mongoose = require('mongoose');

const Payment = mongoose.model('Payment')

module.exports = {
    async index(req, res) {
        const payments = await Payment.find();

        return res.json(payments);
    },
    async store(req, res) {
        payment = req.body
        var actual_date = new Date();
        const value = payment.value
        const type = payment.type
        const days = 24 * 60 * 60

        if (type == "debit") {
            payment.status = "received"
            payment.received_date = actual_date.toString()
            payment.installments = 0
            payment.fee = (2.8 * value) / 100
            payment.value -= (2.8 * value) / 100
            await Payment.create(payment);

        } else if (type == "credit") {
            payment.status = "expected"
            received = new Date()
            received.setDate(actual_date.getDate() + 30)
            payment.received_date = received.toString()
            payment.installments = 0
            payment.fee = (3.2 * value) / 100
            payment.value -= (3.2 * value) / 100
            await Payment.create(payment);

        } else if (type == "installment_credit") {
            payment.status = "expected"
            installments = payment.installments
            current_date = actual_date.getDate()
            if (installments >= 2 && installments <= 6) {
                payment.fee = (3.8 * value) / 100
                payment.value -= (3.8 * value) / 100
            } else if (installments >= 7 && installments <= 12) {
                payment.fee = (4.2 * value) / 100
                payment.value -= (4.2 * value) / 100
            }
            payment.received_date = Date(current_date).toString()
            for (var installment_number = 0; installment_number < installments; installment_number++) {
                received_date = new Date()
                current_date  = current_date + 30
                payment.received_date = new Date(received_date.setDate(current_date)).toString()
                console.log(payment.received_date)
                await Payment.create(payment);
                
            
                
            }   
        }

        return res.json(payment);
    },
    async show(req, res) {
        const payment = await Payment.findById(req.params.id);

        return res.json(payment);
    },
    async update(req, res) {

        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(payment);
    },
    async destroy(req, res) {
        await Payment.findByIdAndRemove(req.params.id);

        return res.send();
    }
};