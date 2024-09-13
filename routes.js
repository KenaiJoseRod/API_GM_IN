const express = require('express')
const routes = express.Router()

routes.get('/Obtner_todos_los_datos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM `COMPROBANTES`', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})
routes.get('/GetCom', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        const id=req.query.id;
        const anio = req.query.anio; 
        const mes = req.query.mes; 
        conn.query('CALL sp_Filtra(?, ?,?)', [id,anio,mes], (err,results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});

routes.get('/FiltrarPorRuc', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const ruc = req.query.ruc;

        conn.query('CALL sp_FiltraPorRUC(?)', [ruc], (err, results) => {
            if (err) return res.status(500).send(err);

            
            res.json(results[0]); 
        });
    });
});


routes.post('/insertarCom', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const {
            FECHA,
            NUMERODOCUMENTO,
            RUC,
            RAZONSOCIAL,
            CONCEPTO,
            MONEDA,
            IMPORTE,
            TIPODOCUMENTO,
            EMITIDORECIBIDO
        } = req.body;

        conn.query('CALL sp_insertarComp(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
            FECHA,
            NUMERODOCUMENTO,
            RUC,
            RAZONSOCIAL,
            CONCEPTO,
            MONEDA,
            IMPORTE,
            TIPODOCUMENTO,
            EMITIDORECIBIDO
        ], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('comprobante Registrado!');
        });
    });
});
routes.delete('/eliminarCom', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
            const id=req.query.id;

        conn.query('CALL sp_EliminarComp(?)', [id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Comprobante Eliminado!')
        })
    })
})
routes.put('/actualizar', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
            const id=req.query.id;
            const {
                FECHA,
                NUMERODOCUMENTO,
                RUC,
                RAZONSOCIAL,
                CONCEPTO,
                MONEDA,
                IMPORTE,
                TIPODOCUMENTO,
                EMITIDORECIBIDO
            } = req.body;
        conn.query('CALL sp_ActualizarComp(?,?,?,?,?,?,?,?,?,?)', [
                id,
                FECHA,
                NUMERODOCUMENTO,
                RUC,
                RAZONSOCIAL,
                CONCEPTO,
                MONEDA,
                IMPORTE,
                TIPODOCUMENTO,
                EMITIDORECIBIDO
            ], (err, rows)=>{
            if(err) return res.send(err)

            res.send('comprobante Actualizado')
        })
    })
})
routes.get('/BuscarCom', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        const id=req.query.id;
        conn.query('CALL sp_BuscarComp(?)', [id], (err,results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        });
    });
});

module.exports = routes