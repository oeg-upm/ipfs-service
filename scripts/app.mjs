import * as IPFS from 'ipfs-core'
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import { exec }  from "child_process"
import CID from 'cids'
import { stdout } from 'process';
import events from 'events';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
events.EventEmitter.defaultMaxListeners = 0;

/*
    Añadimos un fichero con el contenido pasado como parámetro
*/
const addFile = async (contenido) => {
    //Las dos líneas de debajo funcionan bien
    const data = await node.add(contenido)
    const cid = data.cid.toString()
    //console.info(cid)
    return cid
}
/*
    Función para añadir varios archivos guardados según un directorio determinado, devuelve en formato JSON
    los ficheros que han sido subidos
*/
const addFiles = async(dir) => {
    var ficheros = fs.readdirSync(dir)
    for (const fichero of ficheros) {
        fs.readFile(dir + "/" + `${fichero}`, async (error, contenido) => {
        if(error) {
            throw error;
        }
        const data = await node.add({path: fichero, content: contenido})
        console.info(data)
    });       
   }
}
const addFilesCID = async(dir) => {
    var ficheros = fs.readdirSync(dir)
    for (const fichero of ficheros) {
        fs.readFile(dir + "/" + `${fichero}`, async (error, contenido) => {
        if(error) {
            throw error;
        }
        const data = await node.add({path: fichero, content: contenido})
        console.info(data.cid.toString())
        //res.push(cid)
    });       
   }
}

const catFile = async (hash) =>{
    const stream = node.cat(hash)
    let data = ''
    for await (const chunk of stream) {
        // chunks of data are returned as a Buffer, convert it back to a string
        data += chunk.toString()
    }
    console.log(data)
    return data
}
const getFile = async(hash,dir) => {
    for await (const buf of node.get(hash)){
        fs.writeFile(dir + "/" + hash, buf, (error) => {
            if(error) {
                throw error;
            }
        });
    }
    console.log("Copiado con éxito el fichero: " + hash)
}
/*
    Función que ancla el archivo pasado como parámetro
*/
const pinAddFile = async(hash) => {
    const res = await node.pin.add(hash)
    console.info(res)
}

/*
 *   Función que muestra el estado de Pin de un fichero
*/
const pinLsFile = async(hash) => {
    for await (const { cid, type } of node.pin.ls({
        paths: [ hash ]
    })) {
        var lsInfo = {cid, type}
        console.log(lsInfo)
    }
    return lsInfo
}

/***
    API RESTful
        Abajo están todas las funciones necesarias para el funcionamiento de la API REST
***/

/*
 *
 *  START NODE
 * 
*/
/*
exec("ipfs id", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
*/

const nodeId = 'ipfs-' + Math.random()*100
const node = await IPFS.create({
    EXPERIMENTAL: {
        pubsub: true,
    },
    repo: nodeId,
    libp2p: {
        config: {
            dht: {
                enabled: true
            }
        }
    }
})
const nodeInfo = await node.id()

//Ponemos a funcionar el server
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use( (request, response, next) => {
    /*response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    */
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
    
});
var router = express.Router();

let respuesta = {
    error: false,
    code: 200,
    mensaje: ''
};
/*
 *  Punto de inicio
 *  http://localhost:4040/
 */
app.get('/', function(req, res) {
    //res.send("API Rest corriendo en la máquina 1.");
    //res.sendFile('inicio.html');
    var options = {
        root: path.join(__dirname)
    };
    var fileName = 'inicio.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.info(err);
        }
    });

});

/*
 *  Método GET que nos devuelve el contenido de un fichero
 *      http://localhost:4040/file/{cid}
 *          getFile()
 */
app.get('/file/:cid', async (req, res) => {
    const {cid } = req.params
    console.info("Leemos el fichero: " + cid);
    try {
        const contenido = await catFile(cid);
        respuesta = {
            error: false, code: 200, message: 'OK', content: contenido
        };
        res.send(respuesta);
    } catch (error) {
        err = {
            error: true,
            code: 400,
            message: 'Invalid cid'
        }
        res.status(400).send(err)
    }
    
});
app.get('/file/ipns/:cid', async (req, res) => {
    const {cid } = req.params
    const addr = '/ipns/' + cid
    console.info("Leemos un fichero publicado: " + addr);
    const comando = 'ipfs cat ' + addr
    let salida = ''
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
            salida = stdout
    });
    setTimeout(function(){
        respuesta = {
            error: false, code: 200, message: 'OK', content: salida
        }
        res.send(respuesta)
        console.log(respuesta)
    },4000);       
});
/*
 *  Método GET que devuelve los peer a los que estamos conectados
 *      http://localhost:4040/peer
 *          getPeers()
 */
app.get('/peer', async (req, res) => {
    console.info("Obtenemos todos los peers a los que estamos conectados");
    try {
        const peers = await node.swarm.peers()
        //console.log(peers)
        respuesta = {error: false, code: 200,peers: peers};    
        res.status(200).send(respuesta);    
    } catch (error) {
        res.status(500).send({error: true, code: 500,message:"Server error."})
    }
    
});
/*
 *  Método GET que desvuelve la información de un peer en concreto
 *      http://localhost:4040/peer/{id}
 *          getPeerInfo()
 */
app.get('/peer/:id', async (req, res) => {
    const {id } = req.params
    console.info("Obtenemos la info del peer: " + id);
    try {
        const peerInfo = await node.id(id)
        console.info(peerInfo)   
        respuesta = {error: false,code: 200,peerInfo}
        res.send(respuesta); 
    } catch (error) {
        console.info(error)
        res.status(400).send({error: true,code: 400,message: 'Invalid cid'})
    }
});
/*
 *  Método GET que devuelve la información de nuestro nodo
 *      http://localhost:4040/id
 *         getNodeInfo()
 */
app.get('/id', async (req, res) => {
    const {id } = req.params
    try {
        console.info("GET info del nodo");
        respuesta = {error: false, code: 200, nodeInfo};
        res.status(200).send(respuesta);
    } catch (error) {
        console.info(error)
        res.status(500).send({error: true, code: 500, message: "Server error"});
    }
    
});
/*
 *  Método GET que devuelve el estado del PIN de un fichero
 *      http://localhost:4040/pin/{cid}
 *          getPinInfo
 */
app.get('/pin/:cid', async (req, res) => {
    const {cid } = req.params
    console.info('Realizamos el GET pin del fichero: ' + cid)
    try {
        const lsInfo = await pinLsFile(cid)
        respuesta = {error: false,code: 200,pinInfo: {
                cid: cid, type: lsInfo.type}            
        };
        res.send(respuesta);
    } catch (error) {
        //console.log(error)
        if (error.code == 'ERR_NOT_PINNED') {
            res.status(404).send({error: true, code: 404, message: 'path ' + cid + ' is not pinned'})
        } else {
            res.status(400).send({error: true, code: 400, message: 'Invalid Path ' + cid})
        }
    }
});
/*
 *  Método GET que devuelve las multiaddress de un peer determinado
 *      http://localhost:4040/dht/peer/{id}
 *          getDht()
 */
app.get('/dht/peer/:id', async (req, res) => {
    const {id } = req.params
    console.info('Obtenemos las dir DHT del nodo: ' + id)
    try {
        const dhtInfo = await node.dht.findPeer(id)
        respuesta = {error: false, code:200, dhtInfo};
        res.send(respuesta);
    } catch (error) {
        console.log(error)
        if(error.code == ERR_NOT_FOUND) {
            res.status(404).send({error: true, code: 404,message: 'Node not found.'}) 
        } else {
            res.status(500).send({Error: 'Server error.'})
        }
    }
});
/*
 *  Método GET que devuelve los peers que pueden proveer un cierto valor
 *      http://localhost:4040/dht/provider/{cid}
 *          getDhtProvider()
 */
app.get('/dht/provider/:cid', async (req, res) => {
    const {cid } = req.params
    console.info('Obtenemos los peers que nos proveen: ' + cid)
    const cc = new CID(cid)
    try {
        const providers = node.dht.findProvs(cc)
        let provs = []
        for await (const prov of providers) {
            provs.push(prov.id.toString())
        }
        //console.log(provs)
        respuesta = {error: false, code: 200, providers: provs}
        res.status(200).send(respuesta)
    } catch (error) {
        console.log(error)
        res.status(400).send({error: true, code: 400, message: 'invalid cid'})
       
    }
});
/*
 *  Método GET que devuelve todas las keys creadas
 *      http://localhost:4040/key
 *          getKeys()
 */
app.get('/key', async (req, res) => {
    console.info('Realizamos el GET de todas las keys')
    try {
        const keys = await node.key.list();
        respuesta = {error: false, code: 200,keys: keys};
        res.send(respuesta);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: true, code: 500, message: "Error"})
    }
});

/*
 *  Método POST que publica el fichero con el contenido que recibe como parámetro
 *      http://localhost:4040/file
 *          postFile()
 */
app.post('/file', async (req,res) => {
    console.log("Creamos fichero. POST")
    const content = req.body.content
    try {
        const cid = await addFile(content);
        respuesta = {
            error: false, code: 201, message: 'Added', cid: cid
        }
        res.send(respuesta)    
    } catch (error) {
        console.info(error)
    }
    
});
/*
 *  Método POST que realizar el PIN de un fichero
 *      http://localhost:4040/pin
 *          postPin()
*/
app.post('/pin', async (req, res) => {
    console.info('Creamos un pin en el fichero. POST')
    const cid = req.body.cid
    try {
        await pinAddFile(cid)
        respuesta = {error: false,code: 201,message: 'Pinned ' + cid};
        res.status(201).send(respuesta);
    } catch (error) {
        res.status(400).send({error: true, code: 400, message: 'Invalid path ' + cid})
    }
});
/*
 *  Método POST que genera una nueva KEY
 *      http://localhost:4040/key
 *          postKey()
*/
app.post('/key', async (req, res) => {
    console.info('Creamos una key. POST')
    const keyName = req.body.name
    let type = req.body.type
    let size = req.body.size
    if(type == null) type = 'rsa'
    if(size == null) size = 2048
    try {
        const key = await node.key.gen(keyName, {type: type,size: size});
        respuesta = {error: false,code: 201,key};
        res.status(201).send(respuesta);
    } catch (error) {
        console.log(error)
        if(error.code == 'ERR_KEY_ALREADY_EXISTS') {
            res.status(400).send({error: true,code: 400, message: 'Key: ' + keyName +', already exists.'});
        } else if(error.code == 'ERR_UNSUPPORTED_KEY_TYPE') {
            res.status(400).send({error: true,code: 400,message: 'Unsupported key type.'});
        } else if(error.code == 'ERR_INVALID_KEY_SIZE') {
            res.status(400).send({error: true,code: 400,message: 'Invalid key size.'});
        } else {
            res.status(500).send({error: true, code: 500,message: 'Could not generate key'})
        }
    }
});
/*
 *  Método POST que publica el fichero
 *      http://localhost:4040/publishing
 *          postIpnsFile()
 */
app.post('/file/ipns', async (req,res) => {
    console.log("Publicamos fichero. POST")
    const cid = req.body.cid
    //console.info('clave:' + req.body.key)
    let clave = req.body.key
    try {
        const addr = '/ipfs/' + cid
        if (req.body.key == null) {
            clave = 'self'
        }
        const comando = "ipfs name publish --key=" + clave + ' ' + cid
        let salida = ''
        
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
                salida = stdout
                respuesta = {
                    error: false,
                    code: 201,
                    mensaje: salida
                }
                res.send(respuesta)
        });
    } catch (error) {
        console.info(error)
    }
});
/*
 *  Método POST para conectarnos a un nuevo peer.
 *      http://localhost:4040/peer 
 *          postPeer(), connect()
*/
app.post('/peer', async (req,res) => {
    console.log("Nos conectamos a un nuevo peer. POST")
    let addr = req.body.addr
    let id = req.body.id
    if (addr == null && id == null) {
        res.status(400).send({error: true, code: 400, message: "Incorrect parameter."})
        return
    }
    try {
        let cid
        if(id != null)  cid = await node.swarm.connect('/p2p/' + id)
        if (addr != null) cid = await node.swarm.connect(addr)
        respuesta = {error: false,code: 201,message: "Successful connection"}
        res.status(201).send(respuesta)
    } catch (error) {
        console.info(error)
        res.status(500).send({error: true, code: 500, message: 'Server error'})
    }
});

/*
 *  Método para suscribirse a un topic.
 *      http://localhost:4040/pubsub
 *          sub()
*/
app.post('/pubsub', async (req, res) => {
    console.info('Nos suscribimos a un topic. POST')
    const topic = req.body.topic
    const receiveMsg = (msg) => console.log(new TextDecoder().decode(msg.data))
    try {
        await node.pubsub.subscribe(topic, receiveMsg)
        respuesta = {
            error: false,
            code: 201,
            message: "Subscribed to " + topic
        };
        res.send(respuesta);
    } catch (error) {
        console.log(error)
        respuesta = {
            error: true,
            code: 500,
            message: 'Could not subscribe to the topic ' + topic
        };
        res.status(500).send(respuesta)
    }
});
/*
 *  Método para publicar en un topic.
 *      http://localhost:4040/pubsub/topic
 *          pub()
*/
app.post('/pubsub/:topic', async (req, res) => {
    console.info('Publicamos en un topic. POST')
    const {topic } = req.params
    const message = req.body.content
    const msg = new TextEncoder().encode(message)
    try {
        await node.pubsub.publish(topic, msg)
        respuesta = {
            error: false,
            code: 201,
            message: "Published to" + topic
        };
        res.send(respuesta);
    } catch (error) {
        console.log(error)
        respuesta = {
            error: true,
            code: 500,
            message: 'Could not publish to the topic ' + topic
        };
        res.status(500).send(respuesta)
    }
});
/*
 *  Método DELETE para borrar el pin de un archivo
 *      http://localhost:4040/pin/{cid}
 *          deletePin()
 */
app.delete('/pin/:cid', async (req, res) => {
    const {cid } = req.params
    console.info('Realizamos el DELETE pin' + cid)
    try {
        const info = await node.pin.rm(cid)
        respuesta = {error: false,code: 200,message: 'Unnpined: ' + cid}
        res.status(201).send(respuesta);
    } catch (error) {
        console.info(error)
        if (error.code == 'ERR_INVALID_CID') {
            res.status(400).send({error: true, code: 400, message: 'Invalid CID'})
        } else {
            res.status(404).send({error: true, code: 404, message: 'Not pinned or pinned indirectly'})
        }
    }
});
/*
 *  Método DELETE para borrar una key
 *      http://localhost:4040/key/{name}
 *          deleteKey()
 */
app.delete('/key/:name', async (req, res) => {
    const {name } = req.params
    console.info('Realizamos el DELETE key ' + name)
    try {
        const key = await node.key.rm(name)
        respuesta = {error: false,code: 200,key}
        res.send(respuesta);
    } catch (error) {
        //console.info(error)
        if (error.code == 'ERR_KEY_NOT_FOUND') {
            res.status(404).send({error: true, code: 404, message:'no key named ' + name + ' was found'});
        }
    }
});
/*
 *  Método DELETE para desconectarnos de un peer
 *      http://localhost:4040/peer
 *          deletePeer(), disconnect()
 */
app.delete('/peer/:addr', async (req, res) => {
    console.log("Nos desconectamos de un peer. DELETE")
    let {addr } = req.params
    if (addr == null) {
        console.info("Parámetro incorrecto.")
        res.status(400).send({Error: 'Incorrect param'})
        return
    }
    try {
        const cid = await node.swarm.disconnect(addr)
        respuesta = {
            error: false,
            code: 200,
            message: "disconnect " + addr + " success"
        }
        res.send(respuesta)    
    } catch (error) {
        console.info(error)
        res.status(400).send({Error: 'Incorrect multiaddress'})
    }
});

app.use(router);

app.listen(4040, function () {
  console.log("Node server running on http://localhost:4040");
});
