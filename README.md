# cc_desafio 

## Descrição
API responsável por armazenar, em um database, dados de um cliente e sua respectiva compra e exibir o status e data de pagamento conforme tipo de pagamento (crédito, débito ou parcelada) e desconto de taxa adquirente.

## Índice

- [Requisitos](#Requisitos)
- [Instalação](#Instalação)
- [Uso](#Uso)

## Requisitos: 
É necessário ter instalado na máquina:
 - node.js
 - npm
 - Docker

## Instalação
### Instalando node.js e npm 
```sh
sudo apt-get intall nodejs
```

### Instalando Docker
```sh
sudo apt install docker.io
```


## Uso:

Para rodar a aplicação, utilizar os seguintes comandos:

```sh
docker run --name mongodb -p 27017:27017 -d mongo
npm install
npm start
```
Para interação com a aplicação utilize a [collection](cc_desafio_collection.json) ou siga os passo a seguinte.

### Adicionar pagamento

- URL:`http://localhost:3001/api/payments`
-  Metodo: POST

Para adicionar débito

Body:
```json
{
	"value": 100.00,
	"description": "Bicicleta ZXY Aro 21", 
	"type": "debit", 
	"installments": null, 
	"card": {
		"number": "5200555500001234", 
		"expiry": "20/21", 
		"cvv": "123", 
		"holder": "Fulano de tal" 
	}
}
```

Response Body 
```json
{
  "value": 97.2,
  "description": "Bicicleta ZXY Aro 21",
  "type": "debit",
  "installments": 0,
  "card": {
    "number": "5200555500001234",
    "expiry": "20/21",
    "cvv": "123",
    "holder": "Fulano de tal"
  },
  "status": "received",
  "received_date": "Tue Jun 23 2020 20:01:29 GMT-0300 (-03)",
  "fee": 2.8
}

```
Para adicionar crédito

Body :
```json
{
	"value": 100.00,
	"description": "Bicicleta ZXY Aro 21", 
	"type": "credit", 
	"installments": 0, 
	"card": {
		"number": "5200555500001234", 
		"expiry": "20/21", 
		"cvv": "123", 
		"holder": "Ciclano de tal" 
	}
}
```

Response Body:
```json
{
  "value": 96.8,
  "description": "Bicicleta ZXY Aro 21",
  "type": "credit",
  "installments": 0,
  "card": {
    "number": "5200555500001234",
    "expiry": "20/21",
    "cvv": "123",
    "holder": "Ciclano de tal"
  },
  "status": "expected",
  "received_date": "Tue Jun 23 2020 20:02:53 GMT-0300 (-03)",
  "fee": 3.2
}
```
Para adicionar crédito parcelado

Body
```json
{
	"value": 100.00,
	"description": "Bicicleta ZXY Aro 21", 
	"type": "installment_credit", 
	"installments": 3, 
	"card": {
		"number": "5200555500001234", 
		"expiry": "20/21", 
		"cvv": "123", 
		"holder": "Maria de tal" 
	}
}
```

Response Body:
```json
{
    "card": {
      "number": "5200555500001234",
      "expiry": "20/21",
      "cvv": "123",
      "holder": "Maria de tal"
    },
    "_id": "5ef27c470c9c292ebf675add",
    "value": 96.2,
    "description": "Bicicleta ZXY Aro 21",
    "type": "installment_credit",
    "installments": 3,
    "status": "expected",
    "received_date": "Thu Jul 23 2020 19:03:51 GMT-0300 (-03)",
    "__v": 0
  },
  {
    "card": {
      "number": "5200555500001234",
      "expiry": "20/21",
      "cvv": "123",
      "holder": "Maria de tal"
    },
    "_id": "5ef27c470c9c292ebf675ade",
    "value": 96.2,
    "description": "Bicicleta ZXY Aro 21",
    "type": "installment_credit",
    "installments": 3,
    "status": "expected",
    "received_date": "Sat Aug 22 2020 19:03:51 GMT-0300 (-03)",
    "__v": 0
  },
  {
    "card": {
      "number": "5200555500001234",
      "expiry": "20/21",
      "cvv": "123",
      "holder": "Maria de tal"
    },
    "_id": "5ef27c470c9c292ebf675adf",
    "value": 96.2,
    "description": "Bicicleta ZXY Aro 21",
    "type": "installment_credit",
    "installments": 3,
    "status": "expected",
    "received_date": "Mon Sep 21 2020 19:03:51 GMT-0300 (-03)",
    "__v": 0
  }
```

### Atualizando pagamento

- URL: `https://localhost:3001/api/payments/<id>`
- Metodo: PUT




Para atualizar débito

Body:

```json
{
	"card": {
		"number": "5200555500001234", 
		"expiry": "20/21", 
		"cvv": "123", 
		"holder": "Pedro de tal" 
	}
}
```

Response body:
```json
{
  "card": {
    "number": "5200555500001234",
    "expiry": "20/21",
    "cvv": "123",
    "holder": "Pedro de tal"
  },
  "_id": "5ef29c39d964a33caa7b25d2",
  "value": 97.2,
  "description": "Bicicleta ZXY Aro 21",
  "type": "debit",
  "installments": 0,
  "status": "received",
  "received_date": "Tue Jun 23 2020 21:20:09 GMT-0300 (-03)",
  "__v": 0
}
```


### Deletando pagamento

- URL:`http://localhost:3001/api/payments/<id>`
- Metodo: DELETE

