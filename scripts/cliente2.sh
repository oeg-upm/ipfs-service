#!/bin/bash

#Script para gestionar el script de lectura del nodo de lectura.

#Nos suscribimos al canal que nos avisa cuando se deba actualizar un fichero
node sub.mjs

eliminar="destino.csv"
#echo $lineas

#1897738



while [ $lineas -lt 1897738 ]
do
	if [ $rec -ne 0 ];
	then
		#Si la variable de entorno vale distinto a 0 tenemos cosas que copiar
		node write.mjs 
		export rec=0
	fi
	#Actualizamos el contador de las líneas
	rec=$(wc cliente2.sh -l)
	lineas=$(echo "$rec" | sed "s@$eliminar@@")
done

test -f destino.csv
#if [ $? -eq 0 ];
if [ $? -eq 1 ];
then
    cat destino.csv
fi
