## Scripts 📄

### app.mjs

Ejecuta un nodo IPFS y sus funcionalidades. Despliega la API Rest y gestiona
las peticiones que le llegan al nodo.

### write.mjs

Script que se ejecuta en el nodo que escribe los datos de los sensores. 
Automatiza la subida y publicación de los datos.

### read.mjs

Script que se ejecuta en el nodo que lee los datos.
Automatiza la lectura de los datos subidos a IPFS y los imprime por pantalla.


```
# Ejecución de la API
node app.mjs
```

### leerLineas.sh

Lee el fichero pasado como primer parámetro y realiza el volcado de los datos
en un intervalo de líneas igual al segundo parámetro, o en su defecto, en
intervalos de 100000 líneas

```
./leerLineas.sh sensor1.csv 500000
```

### cliente1.sh

Este script se encarga de llamar a leerLineas.sh con el fin de leer
el fichero de datos de los sensores en los intervalos de 100000 líneas cada 5 segundos.
Mientras tanto se estará ejecutando un bucle donde se llama a write.mjs.
El script Write.mjs sube y publica el contenido del fichero en dicho momento,
una vez publicado, se manda un mensaje al tópico "ipns" para que el nodo2 (lector) se disponga 
a leer los datos subidos. Write.mjs es llamado repetidamente hasta que todas las líneas del fichero
original hayan sido subidas a IPFS.

```
./cliente1.sh
```

### cliente2.sh

Este script se encarga de llamar a sub.mjs y read.mjs.
Sub.mjs suscribe al nodo2 al tópico "ipns" para recibir los avisos del nodo1 y que así, al recibir
un mensaje, se ejecute el script read.mjs que se encarga de leer el fichero publicado en IPFS, copiar
el contenido en una copia en la máquina local, y volcar el contenido mientras tanto.
El script termina cuando se hayan copiado todas las líneas del fichero.

```
./cliente2.sh
```


