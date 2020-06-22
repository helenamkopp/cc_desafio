const mongoose = require('mongoose');

const Payment = mongoose.model('Payment')

module.exports = {
    async index(req, res) {
        const payments = await Payment.find();

        return res.json(payments);
    },
    async store(req, res){
        // req.bod
        
        var date = new Date()
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var dateFormatted = day +'/'+ (month++) +'/' + year;

        var type = req.body.type
        var status = ""
        var value = req.body.value
        var installments = req.body.installments
        var fee = 0
        var received_date = ""

        if (type == "debit") {
            status = "received"
            received_date = dateFormatted
            installments = 0
            fee = (2.8 * value) / 100
            value -= (2.8 * value) / 100 

        } else if (type == "credit") {
            status = "expected"
            received_date = dateFormatted
            installments = 0
            fee = (3.2 * value) / 100 
            value -= (3.2 * value) / 100

        } else if (type == "installment_credit") {
            status = "expected"
            received_date = dateFormatted

            if (installments >= 2 && installments <= 6) {
                fee = (3.8 * value) / 100 
                value -= (3.8 * value) / 100
            } else if (installments >= 7 && installments <= 12) {
                fee = (4.2 * value) / 100 
                value -= (4.2 * value) / 100
            }
            // return res.json(payment);
        }
        // console.log(received_date)
        // console.log(req.body.received_date)
        req.body.installments = installments
        req.body.status = status
        req.body.fee = fee
        req.body.value = value
        
        var payment = await Payment.create(req.body);
        return res.json(req.body);
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