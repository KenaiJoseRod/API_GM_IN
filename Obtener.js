const express = require('express')
const Obtener = express.Router()

Obtener.get('/Carreras', (req, res) => {
    
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        conn.query('SELECT * FROM carreras', (err, results) => {
            if (err) return res.status(500).send(err);

            res.json(results);
        });
    });

});
Obtener.get('/Cargos', (req, res) => {

req.getConnection((err, conn) => {
    if (err) return res.status(500).send(err);

    conn.query('SELECT * FROM carreras', (err, results) => {
        if (err) return res.status(500).send(err);

        res.json(results);
    });
});

});
Obtener.get('/Areas', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
    
        conn.query('SELECT * FROM areas', (err, results) => {
            if (err) return res.status(500).send(err);
    
            res.json(results);
        });
    });
});
Obtener.get('/Facultades', (req, res) => {

        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);
        
            conn.query('SELECT * FROM facultades', (err, results) => {
                if (err) return res.status(500).send(err);
        
                res.json(results);
            });
        });
});
Obtener.get('/Institucioneseducativas', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
    
        conn.query('SELECT * FROM institucioneseducativas', (err, results) => {
            if (err) return res.status(500).send(err);
    
            res.json(results);
        });
    });
    
});
Obtener.get('/TipoEmpleado', (req, res) => {

    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
    
        conn.query('SELECT * FROM tipoempleados', (err, results) => {
            if (err) return res.status(500).send(err);
    
            res.json(results);
        });
    });
    
});

module.exports = Obtener