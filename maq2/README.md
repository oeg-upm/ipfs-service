## Scripts 📄

En esta carpeta diferenciaremos los scripts que usará la máquina 2,
la cual se encarga de descargar los ficheros subidos en IPFS.

### app.mjs

Ejecuta un nodo IPFS y sus funcionalidades. Despliega la API Rest y gestiona
las peticiones que le llegan al nodo.

```
# Ejecución de la API
node app.mjs
```

### sub.mjs

Script que se encarga de suscribirse a los canales en los que se notifica
que un fichero ha sido modificado.

```
# Realizamos la suscripción a los tópicos
node sub.mjs
```
