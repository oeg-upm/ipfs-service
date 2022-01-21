## Scripts caso 2 📄

En esta carpeta diferenciaremos los scripts que usará la máquina 1.

### app.mjs

Utilizado por ambas máquinas. Despliega un nodo IPFS y sus funcionalidades.
Ejecuta la API Rest y gestiona las peticiones que le llegan.

### cliente2.sh (maq 1)

Script que se ejecuta en el nodo que escribe los datos de los sensores.
Realiza la lectura de los ficheros que contienen los datos de sensores
ejecutando los scripts aux2.sh y aux2-2.sh, que a su vez ejecutan el script
lecturaLineas2.mjs.

### lecturaLineas2.mjs (maq 1)
Script que se encarga de subir a IPFS la línea de contenido que los scripts aux
han leído.


### aux2.mjs

Script que lee una línea del fichero int_analog01.csv o int_analog02.csv,
dependiendo del fichero que reciba como argumento. Llaman a lecturaLineas2.mjs
para subir ese contenido a IPFS.

### aux2-2.mjs

Script que lee una línea del pro_power.csv. Llama a lecturaLineas2.mjs
para subir ese contenido a IPFS.

### Ejecución máquina 1:
```
# Despliegue del nodo IPFS y API Rest
ipfs daemon &
node app.mjs
```
```
# Ejecución del cliente (creamos otro terminal)
./cliente2.sh
```
