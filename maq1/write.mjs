import fetch from 'node-fetch'
import fs from 'fs';
import { exec }  from "child_process"

const num = process.argv[2];

let optionsPost = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            content: 'Subimos este contenido'
    })
}
var cid;
//Subimos y publicamos el fichero
try {
    //Fichero que vamos a publicar
    let data = fs.readFileSync('final' + num + '.csv')
    console.info(data)
    let contenido = data.toString('UTF8');
    //console.log(contenido);
    fetch("http://localhost:4040/file", optionsPost = {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: contenido
        })
    })
    .then(response => response.text())
    .then(data => {
        console.log("Hemos leído los datos de sensores");
        const json = JSON.parse(data)
        cid = json.cid
        console.log("cid: " + cid)
        fetch("http://localhost:4040/file/ipns", optionsPost = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cid: cid
            })
        })
        .then(response => response.text())
        .then(data => {
            const json = JSON.parse(data)
            console.log("Key: " + json.key)
            //Avisamos de que el fichero se ha actualizado
            fetch("http://localhost:4040/pubsub/ipns" + num, optionsPost = {
                method: "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: cid
                })
            })
            .then(response => response.text())
            .then(data => {
            //Procesar los datos
            console.log("Fichero actualizado")
            });
        });
    });
} catch (err) {
    console.error(err);
};

