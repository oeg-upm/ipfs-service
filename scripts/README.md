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

### script.sh

Lee el fichero pasado como primer parámetro y realiza el volcado de los datos
en un intervalo de líneas igual al segundo parámetro, o en su defecto, en
intervalos de 1000 líneas

```
./script.sh sensor1.csv 5000
```
