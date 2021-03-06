# API Restful para IPFS

API desarrollada en javascript para la creaci贸n de un nodo que recibe
y ejecuta las funcionalidades IPFS pertientes en funci贸n de las peticiones http
que recibe.

## Comenzando 馃殌

_En este apartado se presentan las principales herramientas necesarias._

### Instalaci贸n 馃敡

#### Instalaci贸n de Node JS 

* [node.js](https://nodejs.org/es/download/) - descarga del entorno de ejecuci贸n

_Descarga e instalaci贸n desde ubuntu_

```
# Si utilizamos ubuntu
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

_Inicializaci贸n del proyecto_

```
npm init
```

_Instalaci贸n de las dependencias usadas en el proyecto_
```
npm install ipfs-core express body-parser cids method-override url path getenv setenv
```

_Modificaci贸n del l铆mite de bytes parseables: 200mb en vez de 50kb_
```
File: node_modules/body-parser/lib/types/json.js

  var limit = typeof opts.limit !== 'number'
    ? bytes.parse(opts.limit || '200mb')
    : opts.limit
```


#### Instalaci贸n de IPFS

* [ipfs.io](https://dist.ipfs.io/#go-ipfs) - descarga del fichero binario

```
#Descargamos el fichero binario
wget https://dist.ipfs.io/go-ipfs/v0.11.0/go-ipfs_v0.11.0_linux-amd64.tar.gz

#Descomprimimos el fichero
tar -xvzf go-ipfs_v0.11.0_linux-amd64.tar.gz

#Ejecutamos el fichero de instalaci贸n
cd go-ipfs
sudo bash install.sh

#Comprobamos que ha sido instalado correctamente_
ipfs --version
> ipfs version 0.11.0
```

#### Despliegue de la API Rest (app.mjs)

_Se debe ejecutar en cada m谩quina de cada caso el script app.mjs_

```
ipfs daemon &
node app.mjs
```



## Construido con 馃洜锔?

* [js-ipfs](https://js.ipfs.io/) - librer铆a para ipfs
* [node.js](https://nodejs.org/es/) - entorno de ejecuci贸n para javascript

## Autores 鉁掞笍

* **Javier D铆ez de la Torre** - [javidt](https://github.com/javidt)
