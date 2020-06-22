var type = false
var status = false
var value = 0
var installments = 0

if (type == debit) {
    status = "received"
    received_date = Date
    fee = (2.8 * value )/ 100 (aqui sai o valor da fee) ou 
    value -= (2.8 * value) / 100 (aqui já sai o valor da transação com o desconto)

} else if (type == credit) {
    status = "expected"
    received_date = Date
    fee = (3.2 * value)/ 100 ou
    value -= (3.2 * value) / 100 

} else if(type == installment_credit) {
    status = "expected"
    received_date = (Date + (30 * installments))

    if(installments >= 2 && installments <= 6){
        fee = (3.8 * value)/ 100 ou
        value -= (3.8 * value) / 100
    } else if(installments >= 7 && installments <= 12){
        fee = (4.2 * value)/ 100 ou
        value -= (4.2 * value)/ 100
    }

    }


/* Acho que, nem preciso de uma variavel fee, porque posso retornar o próprio valor com o desconto, tipo, 
criar uma variavel fee nao faria sentido pq eu so teria + trabalho- posso ter uma variavel valor que no momento que for criada, debit, credit etc vai fazer o desconto
e armazenar o valor com o desconto ja  FOI O QUE EU ENTENDI. */

/* o installments deixei como required false, pq só vai precisar se o type de pagamento for installment_credit - mas nao sei se ta certo isso :/ */