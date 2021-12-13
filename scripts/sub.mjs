import fetch from 'node-fetch'
import fs from 'fs'

//Script para suscribirse al topic ipns
const optionsPost = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    	topic: "ipns"
    })
};

fetch("http://localhost:4040/pubsub", optionsPost)
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    console.log("Nos suscribimos al topic: ipns")
});
