#!/bin/bash

#start=$SECONDS

#Script que se encarga del caso2 de los ficheros int_analog1 y 2
if [ $# -ne 1 ];
then
	echo "Error en el número de parámetros"
	exit
fi

#node lecturaLineas.mjs pro_power.csv &
CONT=0

test -f nuevo
if [ $? -eq 0 ];
then
	rm nuevo
fi
while IFS= read -r line
do
	if [ $CONT -eq 30 ];
	then
		echo "Ya hemos acabado"
		exit 0
	fi
	echo "$line" >> nuevo
	#Llamamos al script que va a subir el fichero
	node caso2.mjs $1
	sleep 5
	CONT=$((CONT + 1))
done < $1

#duration=$(( SECONDS - start ))
#echo "duracion: " $duration
