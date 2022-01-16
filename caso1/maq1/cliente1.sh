#!/bin/bash

#Script para el caso 1. Automatiza el proceso de lectura de la máquina 1

start=$SECONDS
rm final*
node lecturaLineas.mjs pro_power.csv &
node lecturaLineas.mjs int_analog01.csv & 
node lecturaLineas.mjs int_analog02.csv

duration=$(( SECONDS - start ))
echo "duracion: " $duration
