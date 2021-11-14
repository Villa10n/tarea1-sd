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
    const consumer = kafka.consumer({ groupId: 'test-group' });

    arr = [];

    await consumer.connect();
    await consumer.subscribe({ topic: 'orders', fromBeginning: false });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            arr.push(message.value.toString());
        },
    });

    setTimeout(async function() {
        await consumer.disconnect();
        console.log(arr);
    }, 10000);
    ids_carritos=[]
    uniques=[]
    //agregar todos los ids recibidos

    if(sumar==1){ 
        var hoy=new Date();   
        arr.forEach(element =>{
            ids_carritos.push(
                {
                    'id':element.id_carrito,
                    'cocinero':element.email_cocinero,
                    'vendedor':element.email_vendedor
                });
        } );
        //guarda los valores unicos de cada carrito

        ids_carritos.forEach(function (car) {
            // The code within the following block runs only if the
            // current car does NOT exist in the uniqueCars list
            // - a.k.a. prevent duplicates
            if (uniques.indexOf(car["id"]) === -1) {
                // Since we now know we haven't seen this car before,
                // copy it to the end of the uniqueCars list.
                uniques.push(car["id"]);
            }
        });
        console.log(uniques);
        console.log(arr);
        for (let i of uniques){
            contador=0;
            for(let j of arr ){
                //cuando el id carrito coincide con el j.id le suma la cantidad
                if( i == j.id_carrito){
                    //
                    contador=contador+j.cantidad
                }
            }
            // ingresar total y dia de carrito para el dailySumari
            ids_carritos[i]['total_vendido']=contador
            ids_carritos[i]['fecha']=`${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`
        }
        // Conexiones
        const producer = kafka.producer();


        // Guardamos los dailysummary en el topic 
        await producer.connect()
        for (let i of ids_carritos){
            await producer.send({
                        topic: 'dailySummary',
                        messages: [
                            { value: data },
                        ],});
        }
        await producer.disconnect()
    }
    // Desconectemos al consumidor
    return res.status(200).json({
        ok: true,
        msg: 'daily'
    });
    // codigo
});

module.exports = router;
