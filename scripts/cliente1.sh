#!/bin/bash
#Script que ejecuta la lectura del nodo1.


./leerLineas.sh scripts/int_analog01.csv &

while [ $bucle -eq 0 ]
do
	node write.mjs
	sleep 10
done
	
echo "Terminada la ejecución"
