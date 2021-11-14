const { Router } = require('express');
const router = Router();
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

router.post('/orders', async (req, res) => {
    const data = JSON.stringify(req.body);
    
    // Conexiones
    const producer = kafka.producer();
    
    // Guardamos en orders
    await producer.connect()
    await producer.send({
        topic: 'orders',
        messages: [
            { value: data },
        ],
    });

    await producer.disconnect()

    return res.status(200).json({
        ok: true,
        msg: 'orden ingresada'
    });
});

router.get('/DailySummary', async (req, res) => {
    // codigo
});

module.exports = router;
