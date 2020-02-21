const express = require('express');
const app = express();
const cors = require('cors');

/*===== Middlewares: funciones que se ejecutan antes de las rutas =====*/
//Para procesar JSON
app.use(express.json());
//Cuando se envia datos desde un form este procesa y convierte en objeto
//Extended: false -> para usar solo elementos basicos de un form
app.use(express.urlencoded({extended: false}));

//Cors
app.use(cors());

//Routes
app.use(require('./routes/index'));

//Puerto: 3000
app.listen(3000);
console.log("Servidor corriendo en el puerto: 3000");