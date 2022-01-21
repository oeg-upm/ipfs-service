import fetch from 'node-fetch'
import fs from 'fs'

//Script para suscribirse al topic ipns
var optionsPost = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    	topic: "ipns01"
    })
};

fetch("http://localhost:4040/pubsub", optionsPost ={
method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    	topic: "ipns01"
    })
})
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    console.log("Nos suscribimos al topic: ipns01")
});
fetch("http://localhost:4040/pubsub", optionsPost ={
method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    	topic: "ipns02"
    })
})
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    console.log("Nos suscribimos al topic: ipns02")
});
fetch("http://localhost:4040/pubsub", optionsPost ={
method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    	topic: "ipns03"
    })
})
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    console.log("Nos suscribimos al topic: ipns03")
});
