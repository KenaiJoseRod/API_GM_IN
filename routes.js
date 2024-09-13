const express = require('express')
const routes = express.Router()

routes.get('/Obtener_todos_los_datos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if (err) return res.status(500).send(err);

        conn.query('CALL sp_ListarEmpresa()', (err, results)=>{
            if (err) return res.status(500).send(err);

        
            res.json(results[0]); 
                
        })
    })
})
/* 
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
*/

routes.post('/insertarEmpr', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);

        const {
            EMPRESAS,
            DESCRIPCION,
            DIRECCION,
            RUC,
            FUENTE,
            
        } = req.body;

        conn.query('CALL sp_InsertEmp(?, ?, ?, ?, ?)', [
            EMPRESAS,
            DESCRIPCION,
            DIRECCION,
            RUC,
            FUENTE
            
            
        ], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('comprobante Registrado!');
        });
    });
});

routes.delete('/eliminarEmpresa', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
            const id=req.query.id;

        conn.query('CALL sp_ElimEmpr(?)', [id], (err, rows)=>{
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
                EMPRESAS,
                DESCRIPCION,
                DIRECCION,
                RUC,
                FUENTE,
            } = req.body;
        conn.query('CALL sp_ActaEmp(?,?,?,?,?,?)', [
                id,
                EMPRESAS,
                DESCRIPCION,
                DIRECCION,
                RUC,
                FUENTE
            ], (err, rows)=>{
            if(err) return res.send(err)

            res.send('comprobante Actualizado')
        })
    })
})

routes.get('/BuscarEmp', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        const id=req.query.id;
        conn.query('CALL sp_BuscarEmpr(?)', [id], (err,results) => {
            if (err) return res.status(500).send(err);

            res.json(results[0]);
        })
    })
})

module.exports = routes