const express = require('express')
const jwt=require("jsonwebtoken")
const routes = express.Router()


routes.post("/login",(req, res)=>{
    const user={
        id:1,
        nombre:"admin",
        email:"admin@gmail.com"
    }
    jwt.sign({user:user},'secretkey',(err,token)=>{
        res.json({
            token
        })
    })
})
//Authorization: Bearer <token>
function verefi(req,res,next){
   const veris= req.headers['authorization']
    if(typeof veris !=='undefined') {
       const veri= veris.split(" ")[1]
       req.token=veri
       next()
    }else{
        res.sendStatus(403)
    }
}
routes.get('/Obtener_todos_los_datos', verefi, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            return res.sendStatus(403);
        }
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            conn.query('CALL sp_ListarEmpresa()', (err, results) => {
                if (err) return res.status(500).send(err);

                res.json(results[0]);
            });
        });
    });
});
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

routes.post('/insertarEmpr', verefi, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            return res.sendStatus(403);
        }

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

                res.send('Comprobante Registrado!');
            });
        });
    });
});


routes.delete('/eliminarEmpresa', verefi, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            return res.sendStatus(403);
        }

        req.getConnection((err, conn) => {
            if (err) return res.send(err);

            const id = req.query.id;

            conn.query('CALL sp_ElimEmpr(?)', [id], (err, rows) => {
                if (err) return res.send(err);

                res.send('Comprobante Eliminado!');
            });
        });
    });
});

// Ruta para actualizar una empresa
routes.put('/actualizar', verefi, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            return res.sendStatus(403);
        }

        req.getConnection((err, conn) => {
            if (err) return res.send(err);

            const id = req.query.id;
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
            ], (err, rows) => {
                if (err) return res.send(err);

                res.send('Comprobante Actualizado!');
            });
        });
    });
});

// Ruta para buscar una empresa
routes.get('/BuscarEmp', verefi, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            return res.sendStatus(403);
        }

        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);

            const id = req.query.id;
            conn.query('CALL sp_BuscarEmpr(?)', [id], (err, results) => {
                if (err) return res.status(500).send(err);

                res.json(results[0]);
            });
        });
    });
});
module.exports = routes