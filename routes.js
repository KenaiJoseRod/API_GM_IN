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
routes.put('/actualizarEmpleado', (req, res) => {
        req.getConnection((err, conn) => {
            if (err) return res.send(err);
            const id = req.query.id;
            const {
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

            conn.query('CALL sp_update_empleado(?,?,?,?,?,?,?,?,?,?,?)', [
                id,
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
            ], (err, rows) => {
                if (err) return res.send(err);

                res.send('Empleado Actualizado!');
            });
        });
});
routes.put('/actualizarPracticante', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        const id = req.query.id;
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

        conn.query('CALL sp_upd_practicante(?,?,?,?,?,?,?,?,?,?)', [
            id,
            idcarrera,
            idinstitucioneducativa,
            idarea,
            idfacultad,
            idtipoempleado,
            codigoestudiante,
            ciclo,
            fechainicio,
            fechafin
        ], (err, rows) => {
            if (err) return res.send(err);

            res.send('Practicante Actualizado!');
        });
    });
});

routes.delete('/eliminarPracticante', (req, res) => {
    req.getConnection((err, conn) => {
            if (err) return res.send(err);
            const id = req.query.id;
            conn.query('CALL sp_dlt_practicante(?)', [id], (err, rows) => {
                if (err) return res.send(err);

                res.send('Practicante Eliminado!');
            });
        });
});
routes.delete('/eliminarEmpleado', (req, res) => {
    req.getConnection((err, conn) => {
            if (err) return res.send(err);
            const id = req.query.id;
            conn.query('CALL sp_dlt_empleado(?)', [id], (err, rows) => {
                if (err) return res.send(err);

                res.send('Practicante Eliminado!');
            });
        });
});
module.exports = routes