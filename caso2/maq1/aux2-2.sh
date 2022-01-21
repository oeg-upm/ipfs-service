#!/bin/bash

#Script que se encarga del caso 2 del fichero pro_power.csv
if [ $# -ne 1 ];
then
	echo "Error en el número de parámetros"
	exit
fi

CONT=0

test -f nuevo
if [ $? -eq 0 ];
then
	rm nuevo
fi
while IFS= read -r line
do
	if [ $CONT -eq 0 ];
	then
		echo "$line" >> nuevo
	fi
	if [ $CONT -eq 1133 ];
	then
		echo "Ya hemos acabado"
		exit 0
	fi
	if [ $CONT -gt 1104 ];
	then
		echo "$line" >> nuevo
		#Llamamos al script que va a subir el fichero
		node lecturaLineas2.mjs $1
	sleep 5
	fi
	CONT=$((CONT + 1))
done < $1
