## Scripts caso 1 📄

En esta carpeta diferenciaremos los scripts que usarán las 2 máquinas.

### app.mjs

Utilizado por ambas máquinas. Despliega un nodo IPFS y sus funcionalidades.
Ejecuta la API Rest y gestiona las peticiones que le llegan.

```
# Ejecución de la API
node app.mjs
```

### cliente1.sh (maq 1)
Script que se ejecuta en el nodo que escribe los datos de los sensores. 
Realiza la lectura de los ficheros que contienen los datos de sensores
ejecutando el script lecturaLineas.mjs, que a su vez ejecuta el script
write.mjs.


### lecturaLineas.mjs (maq 1)
Script que recibe como primer parámetro el fichero de datos de sensores
que tiene que tratar. Lee trozos de 400000 lineas y acto seguido llama
al script write.mjs para subirlas a IPFS.


### write.mjs (maq 1)
Script ejecutado desde lecturaLineas, realiza las solicitudes de POST a la
API para subir los datos de los sensores y acto seguido notificar a la 
maq 2 de que los ficheros han sido actualizados mediante pubsub.


### sub.mjs (maq 2)
Script ejecutado por la máquina para suscribirse a los canales por los que la
máquina 1 notificará las actualizaciones.


### Ejecución máquina 1:
```
# Despliegue del nodo IPFS y API Rest
ipfs daemon &
node app.mjs
```
```
# Ejecución del cliente (creamos otro terminal)
./cliente1.sh
```

### Ejecución máquina 2:

```
# Despliegue del nodo IPFS y API Rest
ipfs daemon &
node app.mjs
```

```
# Suscripción a los topics
node sub.mjs
```
