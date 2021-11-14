
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

Con esto tendremos nuestra API corriendo y funcionando, conectada con los servicios y topics de Apache Kafka.
          
