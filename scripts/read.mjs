import fetch from 'node-fetch'
import fs from 'fs'

const optionsGet = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }
};
// Petición HTTP de un get
const key = "k51qzi5uqu5dk9bwkaayajs0vnw0gielvkxq48og9y2igjdv1y0apbr3fy1fmi";
const hash = "QmWWM1ru8CZ8Qih2m8JNyWnZP8hBH9C6DVw5WhYg2P6rvQ";


fetch("http://localhost:4040/file/ipns/" + key, optionsGet)
    .then(response => response.text())
    .then(data => {
    //Procesar los datos
    const json = JSON.parse(data);
    const aux = json.content
    const content = aux.toString('UTF8');
    //console.log(json)
    //Escribimos el contenido recibido en un fichero destino
    fs.writeFileSync('destino.csv', content, {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    });
});


