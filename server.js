const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors'); // Importa el paquete cors
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: 'mysql-27664253-jr805036-084d.k.aivencloud.com',
    port: 11289,
    user: 'avnadmin',
    password: 'AVNS_j9QXeuWqs8y9EbANPoK',
    database: 'defaultdb'
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
