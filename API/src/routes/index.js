const { Router } = require('express');
const router = Router();
module.exports = router;

/*========== CRUD PATRONES ==========*/
const patron = require('../controllers/patrones.controller');

router.get('/patrones', patron.getPatrones);
router.get('/patrones/:id', patron.getPatronById);
router.post('/patrones', patron.setPatron);
router.put('/patrones', patron.upPatron);
router.delete('/patrones/:id', patron.delPatron);

/*========== CRUD EMPLEADOS ==========*/
const empleado = require('../controllers/empleados.controller');

router.get('/empleados', empleado.getEmpleados);
router.get('/empleados/:id', empleado.getEmpleadoByID);
router.post('/empleados', empleado.setEmpleado);
router.delete('/empleados/:id', empleado.delEmpleado);

router.get('/terapistas', empleado.getTerapista);
router.get('/terapistas/:id', empleado.getTerapistaByID);
router.put('/terapistas', empleado.setTerapista);

/*========== LOGIN ==========*/
const login = require('../controllers/login.controller');

router.post('/login', login.doLoginApp);

/*========== CRUD REPRESENTANTES ==========*/
const representante = require('../controllers/representantes.controller');

router.get('/representantes', representante.getRepresentantes);
router.get('/representantes/:id', representante.getRepresentanteById);
router.post('/representantes', representante.setRepresentante);
router.put('/representantes', representante.upRepresentante);
router.delete('/representantes/:id', representante.delRepresentante);

/*========== CRUD PACIENTES ==========*/
const paciente = require('../controllers/pacientes.controller');

router.get('/nombres-pacientes', paciente.getPacientesNombres);
router.get('/pacientes', paciente.getPacientes);
router.get('/pacientes/:id', paciente.getPacientesById);
router.post('/pacientes', paciente.setPaciente);
router.put('/pacientes', paciente.upPaciente);
router.delete('/pacientes/:id', paciente.delPaciente);

/*========== CRUD PACIENTES ==========*/
const terapia = require('../controllers/terapias.controller');

router.get('/terapias', terapia.getTerapias);
router.get('/terapias/:id', terapia.getTerapiasById);
router.post('/terapias', terapia.setTerapia);
router.delete('/terapias/:id', terapia.delTerapia);

/*========== CRUD CARGOS ==========*/
const cargo = require('../controllers/cargos.controller');

router.get('/cargos', cargo.getCargos);
router.get('/cargos/:id', cargo.getCargoById);
router.post('/cargos', cargo.setCargo);
router.put('/cargos', cargo.upCargo);
router.delete('/cargos/:id', cargo.delCargo);

/*========== CRUD ROLES ==========*/
const rol = require('../controllers/roles.controller');

router.get('/roles', rol.getRoles);
router.get('/roles/:id', rol.getRolesById);
router.post('/roles', rol.setRol);
router.put('/roles', rol.upRol);
router.delete('/roles/:id', rol.delRol);