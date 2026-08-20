const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/estudio', require('./routes/estudio'));
app.use('/api/ejercicio', require('./routes/ejercicio'));
app.use('/api/sueno', require('./routes/sueno'));
app.use('/api/peso', require('./routes/peso'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/eventos', require('./routes/eventos'));
app.use('/api/kanban', require('./routes/kanban'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});