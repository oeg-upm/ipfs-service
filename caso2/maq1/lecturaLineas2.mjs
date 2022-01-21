import fs, { read } from 'fs'
import { exec, fork } from 'child_process'
import readline from 'readline'
import fetch from 'node-fetch'

let optionsPost = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
            content: 'Subimos este contenido'
    })
}
var num = "00";
//const archivo='scripts/int_analog01.csv'
const archivo = process.argv[2];
if(archivo == "int_analog01.csv") num = "01";
if(archivo == "int_analog02.csv") num = "02";
if(archivo == "pro_power.csv") num = "03";
console.log(archivo)

//else num = archivo.replace("int_analog",'').replace('.csv','')

const readable = fs.createReadStream('nuevo')
//const escritor = fs.createWriteStream('final' + num + '.csv')
var rl = readline.createInterface({
    input: readable,
    crlfDelay: Infinity
});

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
}
console.log("realizamos el post")
try {
    //Fichero que vamos a publicar
    var contenido = fs.readFileSync('nuevo',{encoding:'utf8', flag:'r'});
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
            const json = JSON.parse(data)
            const cid = json.cid
            console.log("CID: " + json.cid)
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
                //console.log("Fichero actualizado")
            });
        });
} catch (err) {
    console.error(err);
};
