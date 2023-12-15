
const express = require('express');
const cors = require('cors');
const dbconnect = require('../database/config');
const fileUpload = require('express-fileupload');
const  path     = require('path');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.conectarDB();
        this.middleware();
        this.routes(); 
    }

    async conectarDB(){
        await dbconnect();
    }

    
    middleware(){
        //Cors
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
     
    }
    routes(){
        this.app.use('/api/auth',require('../routes/auth'));
        this.app.use('/api/busqueda',require('../routes/busqueda'));
        this.app.use('/api/categorias',require('../routes/categorias'));
        this.app.use('/api/productos',require('../routes/productos'));
        this.app.use('/api/usuarios',require('../routes/usuarios'));
        this.app.use('/api/uploads',require('../routes/uploads'));
        // this.app.get('*',  (req, res) => {

        //       res.sendFile(path.join(__dirname, '../public/index.html'));
        //     });
    
    }



    listen(){
        this.app.listen(this.port ,() =>{ console.log('running port : ' + this.port)});   
    }
}

module.exports = Server;