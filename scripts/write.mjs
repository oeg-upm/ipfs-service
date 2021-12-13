import fetch from 'node-fetch'
import fs from 'fs';


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
    let data = fs.readFileSync('datos.csv');
    let contenido = data.toString('UTF8');
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
        const json = JSON.parse(data)
        cid = json.cid
        console.log(cid)
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
            //console.log(json)
            });
        });
} catch (err) {
    console.error(err);
};

//Avisamos de que el fichero se ha actualizado
fetch("http://localhost:4040/pubsub/ipns", optionsPost = {
        method: "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: "El fichero ha sido actualizado."
        })
    })
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    console.log("Nos suscribimos al topic: ipns")
});
