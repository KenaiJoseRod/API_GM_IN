const express = require('express')
const routes = express.Router()

//Authorization: Bearer <token>

routes.post('/insertarPracticante', (req, res) => {
        req.getConnection((err, conn) => {
            if (err) return res.status(500).send(err);
            const {
                idcarrera,
                idinstitucioneducativa,
                idarea,
                idfacultad,
                idtipoempleado,
                codigoestudiante,
                ciclo,
                fechainicio,
                fechafin
            } = req.body;

            conn.query('CALL sp_ins_practicante(?, ?, ?, ?, ?,?,?,?,?)', [
                idcarrera,
                idinstitucioneducativa,
                idarea,
                idfacultad,
                idtipoempleado,
                codigoestudiante,
                ciclo,
                fechainicio,
                fechafin
            ], (err, results) => {
                if (err) return res.status(500).send(err);

                res.send('Practicante Registrado!');
        });
     });
});

routes.post('/insertarEmpleado', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send(err);
        const {
            idempleado,
            idcargo,
            apellidos,
            nombres,
            fechanacimiento,
            correo,
            dni,
            telefono,
            distrito,
            direccion,
            idpracticante
        } = req.body;
        conn.query('CALL sp_ins_empleado(?, ?, ?, ?, ?,?,?,?,?,?,?)', [
            idempleado,
            idcargo,
            apellidos,
            nombres,
            fechanacimiento,
            correo,
            dni,
            telefono,
            distrito,
            direccion,
            idpracticante
        ], (err, results) => {
            if (err) return res.status(500).send(err);

            res.send('Empleado Registrado!');
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
*/
module.exports = routes