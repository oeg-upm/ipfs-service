#!/bin/bash

start=$SECONDS
echo 'Script para automatizar la lectura de los ficheros de datos de sensores'

if [ $# -eq 1 ];
then
    LINEAS=100000
elif [ $# -eq 2 ];
then
    LINEAS=$2
    echo $LINEAS
else
    echo 'Número de parámetros incorrecto' 1>&2
    echo 'Introduzca el nombre del fichero y el intervalo de líneas' 1>&2
    exit 1
fi

#Comprobamos que el fichero pasado como parámetro existe
test -f $1
if [ $? -ne 0 ];
then
    echo 'El fichero pasado como parámetro no existe' 1>&2
    exit 2
fi

cp $1 aux

test -f fich.csv
if [ $? -eq 0 ]
then
    rm fich.csv
fi
touch fich.csv

CONT=0
FIN=0
while IPFS= read -u10 line
do
    if [ $CONT -eq $LINEAS ];
    then
        CONT=0
        #read -n 1 -s -r -p "Pulsar tecla"
        sleep 5
        echo "Esperamos 5 segundos"
    fi
    CONT=$((CONT + 1))
    FIN=$((FIN + 1))
    echo $line >> fich.csv
done 10< aux
rm aux

duration=$(( SECONDS - start ))

echo "Duration: " $duration
export bucle=1

#read -n 1 -s -r -p "Pulsar tecla"
#echo
#echo "Num lineas: " $FIN
