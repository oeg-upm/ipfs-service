#!/bin/bash
#Script que ejecuta la lectura del nodo1.


start=$SECONDS
node lecturaLineas.mjs scripts/int_analog01.csv &
node lecturaLineas.mjs scripts/int_analog02.csv 
duration=$(( SECONDS - start ))
echo "duracion: " $duration
