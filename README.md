
Este proyecto fue realizado utilizando el SO Ubuntu 20.04, una distrubución de Linnux basado en Debian.

Para poder iniciar el servidor, debe instalar los siguientes paquetes: Node.js - Express - Nodemon - npm

-Instalación de Node: en la consola debemos escribir los siguientes comandos y espera a que cada uno de ellos finalice: 
        
                      curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
                      sudo apt-get install -y nodejs
         En caso de no tener instalado curl, siga las indicaciones que se le mostraran en su consola.
         
Luego en la carpeta que haya clonado este repositorio, debe ejecutar el siguiente comando:

                      npm install
                      
Este comando descargara automanticamente todas las dependencias que requiere el proyecto, en este caso son express y nodemon.

Una vez completados estos pasos, su servidor estará listo para arrancar con el comando:  npm run dev

Ahora, para la instalación de Kafka, debe visitar el siguiente sitio web: https://kafka.apache.org/downloads donde debe escoger el archivo
correspondiente a su distribución (Linux para este caso).

Una vez descargado, debe mover el archivo a la carpeta que estime conveniente, una vez hecho esto, haga click derecho sobre
el archivo y pulse "Extraer Aquí", para descomprimir el archivo. Una nueva carpeta se generará, ingrese a ella y abra un terminal, 
hecho esto proceda a ejecutar el siguiente comando:

                      bin/zookeeper-server-start.sh config/zookeeper.properties
                      
Hecho esto tendremos zookeeper arrancado, el cual  proporciona un servicio de configuración distribuido, un servicio de sincronización
 y un registro de nomenclatura para sistemas distribuidos.

Ahora debemos arrancar Kafka, para esto usamos un comando similar, debemos abrir otro terminal en la carpeta que estabamos anteriormente
y ejecutar el siguiente comando:
            
                      bin/kafka-server-start.sh config/server.properties
          
                                                            Ya tenemos Apache Kafka funcionando perfectamente.
          
          
Ahora para inicializar los topic deseados, debemos iniciar dos nuevos terminales dentro de nuestra carpeta de Kafka, luego en cada uno de ellos usamos los siguientes comandos, uno en cada terminal:
```

                /bin/kafka-console-producer.sh --broker-list localhost:9092 --topic orders
                /bin/kafka-console-producer.sh --broker-list localhost:9092 --topic DailySummary

```
Luego en la antes mencionada carpeta donde clonamos este repositorio e introducimos el comando npm install por consola, debemos ejecutar el siguiente comando:

```
                npm run dev                
```

Con esto tendremos nuestra API corriendo y funcionando, conectada con los servicios y topics de Apache Kafka

La primera funcionalidad del sistema corresponde a una ruta tipo post llamada "orders", que utiliza la funcinalida de productor de kafka , la cual agrega elementos al topico de orders, y a esta ruta se le entregan como parametros mediante el body, los siguientes parametros : "id carrito" , "email_vendedor", "email_cocinero", "cantidad". Y esta ruta se conecta al topico "orders", y publica la informacion recibida por parte del req.body.

La segunda ruta la cual pertece a "DailySummary", cuenta con tres funcoinalidad, las cuales son: Escuchar durante un periodo de tiempo, para capturar las ordenes que fueron emitidas durante ese lapso, la siguiente es contar la cantidad de ordenes recibidas por cada carrito y hacer la cuenta diaria, y finalmente publicar estos datos en el topic de kafka llamado "DailySummary".

Respecto a esta ultima ruta, tenemos problemas sobre como acceder a la estructura de diccionarios de js, ya que el tema de consumir los mensajes que se estan publicando en el topico de "orders" se esta logrando, por ende se logro implemtar un consumidor de los datos publicados,  y en cuanto al manejo de tiempo es abordado con la funcion de setTimeout, la cual espera un periodo de tiempo definido y luego ejecuta el codigo dentro de esta funcion, el cual pertenece al recuento diario, si bien se logra identificar la cantidad de pedidos por carrito, no se logra agregar el nuevo atributo para el diccionario correspondiete para cada carrito, ademas tambien se trata de agregar la fecha correspondiente a la suma diaria , pero surge el mismo problema. Con esto queremos especeifciar que si bien se logra comprender el objetivo de la tarea que es, utilizar un modelo publicador/susb como lo es kafka, tuvimos problemas con el manejo de estructuras de datos del propio lenguaje.

          
