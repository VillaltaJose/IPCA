const { Router } = require('express');
const router = Router();
module.exports = router;

/*========== CRUD PATRONES ==========*/
const patron = require('../controllers/patrones.controller');

router.get('/patrones', patron.getPatrones);
router.get('/patrones/:id', patron.getPatronById);
router.post('/patrones', patron.setPatron);
router.put('/patrones', patron.uptPatron);


/*========== CRUD PATRONES ==========*/
/*const terapista = require('../controllers/terapistas.controller');

router.get('/terapistas', terapista.getTerapistas);
router.get('/terapistas/:id', terapista.getTerapistaByID);
router.post('/terapistas', terapista.setTerapista);
router.put('/terapistas', terapista.updateTerapista);
router.delete('/terapistas/:id', terapista.delTerapistaByID);*/

/*========== CRUD EMPLEADOS ==========*/
const empleado = require('../controllers/empleados.controller');

router.get('/empleados', empleado.getEmpleados);
router.post('/empleados', empleado.setEmpleado);

/*========== LOGIN ==========*/
const login = require('../controllers/login.controller');

router.post('/login', login.doLogin);