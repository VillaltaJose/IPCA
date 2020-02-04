const express = require('express');
const app = express();

//Routes
app.use(require('./routes/index'));

//Puerto: 3000
app.listen(3000);
console.log("Servidor corriendo en el puerto: 3000");