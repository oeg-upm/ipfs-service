import fs, { read } from 'fs'
import { exec, fork } from 'child_process'
import readline from 'readline'

var num = "00";
//const archivo='scripts/int_analog01.csv'
const archivo = process.argv[2];
if(archivo == "pro_power.csv") num = "03";
else num = archivo.replace("int_analog",'').replace('.csv','')

const readable = fs.createReadStream(archivo)
//const escritor = fs.createWriteStream('final' + num + '.csv')
let bloques = 0;
var rl = readline.createInterface({
    input: readable
});

var lineas = 0;
var bloq = 0;
var content = "";
var cont = 0;
rl.on('line', (line) => {
    //console.log(line)
    lineas += 1;

    bloq += 1;
    content += (line + '\n')
    if(lineas == 400000) {
        cont += 400000
        rl.pause()
        fs.writeFileSync('final' + num + '.csv', content, {
            encoding: "utf8",
            flag: "w+",
            mode: 0o666
        });
        console.info("Pausamos la ejecución")
        let comando = "node write.mjs " + num
        exec(comando, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
                console.log(`stdout: ${stdout}`)
                lineas = 0;
                rl.resume();                
        });
    }
});
rl.on('close', () => {
    fs.writeFileSync('final' + num + '.csv', content, {
        encoding: "utf8",
        flag: "w+",
        mode: 0o666
    });
    console.info("Último bloque del fichero: " + num)
    console.info("Número de líneas copiadas: " + bloq)
    content = ""
    let comando = "node write.mjs " + num
    exec(comando, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
            console.log(`stdout: ${stdout}`)
            console.log("Script terminado")
    });
})
