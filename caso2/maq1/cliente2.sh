#!/bin/bash

start=$SECONDS
./aux2.sh int_analog01.csv
./aux2.sh int_analog02.csv
./aux2-2.sh pro_power.csv
echo "duracion: " $duration
