# API Restful para IPFS

API desarrollada en javascript para la creación de un nodo que recibe
y ejecuta las funcionalidades IPFS pertientes en función de las peticiones http
que recibe.

## Comenzando 🚀

_En este apartado se presentan las principales herramientas necesarias._

### Instalación 🔧

_Instalación de Node JS_

* [node.js](https://nodejs.org/es/download/) - descarga del entorno de ejecución

_Inicialización del proyecto_

```
npm init
```
_Instalación de las dependencias usadas en el proyecto_

```
npm install ipfs-core express body-parser
```

## Archivos 📄

### app.mjs

Ejecuta un nodo IPFS y sus funcionalidades. Despliega la API Rest y gestiona
las peticiones a la misma.

### script.sh

Lee el fichero pasado como primer parámetro y realiza el volcado de los datos
en un intervalo de líneas igual al segundo parámetro, o en su defecto, en
intervalos de 1000 líneas

```
./script.sh sensor1.csv 5000
```

## Construido con 🛠️

* [js-ipfs](https://js.ipfs.io/) - librería para ipfs
* [node.js](https://nodejs.org/es/) - entorno de ejecución para javascript

## Autores ✒️

* **Javier Díez de la Torre** - [javidt](https://github.com/javidt)
