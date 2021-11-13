const { Router } = require('express');
const router = Router();
const kafka = require('kafka-node');


router.post('/orders', async (req, res) => {
    const data = JSON.stringify(req.body);

    // Conexiones
    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    var producer = new kafka.Producer(client);
    
    // Guardamos en orders
    producer.on('ready', async function () {
        await producer.send( [ { topic: "orders", messages: data }], function (err,data) {console.log('enviado')} )
    });

    return res.status(200).json({
        ok: true,
        msg: 'orden ingresada'
    });
});

router.get('/DailySummary2', async (req, res) => {
    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    var consumer = new kafka.Consumer(client, [ { topic: 'orders' } ]);
    await consumer.on('message', function (message) {
    	console.log(message);
	});
    consumer.commit(function(err, data) {
        return res.status(200).json({
            ok: true,
            msg: 'daily'
        });
    });
    // Desconectemos al consumidor
});

router.get('/DailySummary', async (req, res) => {
    const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    var consumer = new kafka.Consumer(client, [ { topic: 'orders' } ]);
    await consumer.on('message', function (message) {
    	console.log(message);
	});
    arr=[]
    contador=0
    //Escucha solo por 10 segundos y corta la coxion, cuando deja de escucha envia un mensaje
    dia=setInterval(function() {
        consumer.on('message', function (message) {
            console.log(message);
            arr.append(message);
        });
        contador=contador+1
    }, 5000);

    if (contador== 1){
        clearInterval(dia)
        print(arr)
    }

    consumer.commit(function(err, data) {
        return res.status(200).json({
            ok: true,
            msg: 'daily'
        });
    });
    // Desconectemos al consumidor
});

module.exports = router;
