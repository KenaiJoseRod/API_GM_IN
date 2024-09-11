const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors'); // Importa el paquete cors
const routes = require('./routes');

const app = express();

app.set('port', process.env.PORT || 9000);

const dbOptions = {
    host: 'brecxjllpsqno3f5pnxe-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'uziajbijfepykm5b',
    password: 'ebv2xfr2ILHVQcG7yaPy',
    database: 'brecxjllpsqno3f5pnxe'
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
