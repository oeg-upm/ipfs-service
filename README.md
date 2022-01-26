# API Restful para IPFS

API desarrollada en javascript para la creación de un nodo que recibe
y ejecuta las funcionalidades IPFS pertientes en función de las peticiones http
que recibe.

## Comenzando 🚀

_En este apartado se presentan las principales herramientas necesarias._

### Instalación 🔧

#### Instalación de Node JS 

* [node.js](https://nodejs.org/es/download/) - descarga del entorno de ejecución

_Descarga e instalación desde ubuntu_

```
# Si utilizamos ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

_Inicialización del proyecto_

```
npm init
```

_Instalación de las dependencias usadas en el proyecto_
```
npm install ipfs-core express body-parser cids method-override url path getenv setenv
```

_Modificación del límite de bytes parseables: 200mb en vez de 50kb_
```
File: node_modules/body-parser/lib/types/json.js

  var limit = typeof opts.limit !== 'number'
    ? bytes.parse(opts.limit || '200mb')
    : opts.limit
```


#### Instalación de IPFS

* [ipfs.io](https://dist.ipfs.io/#go-ipfs) - descarga del fichero binario

```
#Descargamos el fichero binario
wget https://dist.ipfs.io/go-ipfs/v0.11.0/go-ipfs_v0.11.0_linux-amd64.tar.gz

#Descomprimimos el fichero
tar -xvzf go-ipfs_v0.11.0_linux-amd64.tar.gz

#Ejecutamos el fichero de instalación
cd go-ipfs
sudo bash install.sh

#Comprobamos que ha sido instalado correctamente_
ipfs --version
> ipfs version 0.11.0
```

#### Despliegue de la API Rest (app.mjs)

_Se debe ejecutar en cada máquina de cada caso el script app.mjs_

```
ipfs daemon &
node app.mjs
```



## Construido con 🛠️

* [js-ipfs](https://js.ipfs.io/) - librería para ipfs
* [node.js](https://nodejs.org/es/) - entorno de ejecución para javascript

## Autores ✒️

* **Javier Díez de la Torre** - [javidt](https://github.com/javidt)
