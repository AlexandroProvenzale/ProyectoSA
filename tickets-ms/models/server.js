const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;

        this.usersPath  = '/api/users';
        this.authPath   = '/api/auth';
        this.ticketsPath = '/api/tickets';

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

        // CORS
        this.app.use( cors({ origin: '*' }) );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        
        // this.app.use( this.usersPath, require('../routes/users') );
        // this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.ticketsPath, require('../routes/tickets') );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }
}

module.exports = Server;