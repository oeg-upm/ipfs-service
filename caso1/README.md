## Scripts 📄

En esta carpeta diferenciaremos los scripts que usarán las 2 máquinas.

### app.mjs

Ejecuta un nodo IPFS y sus funcionalidades. Despliega la API Rest y gestiona
las peticiones que le llegan al nodo.

```
# Ejecución de la API
node app.mjs
```

### cliente1.sh

Script que se ejecuta en el nodo que escribe los datos de los sensores. 
Realiza la lectura de los ficheros que contienen los datos de sensores
ejecutando el script lecturaLineas.mjs, que a su vez ejecuta el script
write.mjs.

```
# Ejecución del cliente
./cliente1.sh
```

### lecturaLineas.mjs

Script que se encarga de leer los ficheros de sensores línea a línea, y,
cada 400000 líneas ejecuta el script write.mjs para que se suba el fichero
a ipfs.


### write.mjs

Script que se encarga de llamar a los métodos de la API para subir el archivo
y publicar los cambios en el canal pubsub al que la máquina 2 se suscribe.
