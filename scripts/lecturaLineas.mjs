import fs, { read } from 'fs'
import { exec, fork } from 'child_process'
import readline from 'readline'



//const archivo='scripts/int_analog01.csv'
const archivo = process.argv[2];
const num = archivo.replace("scripts/int_analog",'').replace('.csv','')

const readable = fs.createReadStream(archivo)
const escritor = fs.createWriteStream('final' + num + '.csv')
let bloques = 0;
var rl = readline.createInterface({
    input: readable
});

var lineas = 0;
rl.on('line', (line) => {
    //console.log(line)
    lineas += 1;
    
    var content = line + '\n'
    fs.writeFileSync('final' + num + '.csv', content, {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    });
    if(lineas == 400000) {
        rl.pause()
        
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
    console.info("Último bloque del fichero")
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
