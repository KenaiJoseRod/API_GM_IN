const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors'); // Importa el paquete cors
const routes = require('./routes');
require('dotenv').config();
const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

// Usa el middleware cors antes de tus rutas
app.use(cors());

app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('bienvenido');
});
app.use('/api/consultas', routes);

app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'));
});
