const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;

        this.usersPath  = '/api/users';

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        
        const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['*'];

        // CORS
        this.app.use( cors({ origin: allowedOrigins }) );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        
        this.app.use( this.usersPath, require('../routes/users') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;