const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener todos
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM estudio ORDER BY fecha DESC').all();
  res.json(rows);
});

// Agregar
router.post('/', (req, res) => {
  const { fecha, materia, horas, notas } = req.body;
  const stmt = db.prepare('INSERT INTO estudio (fecha, materia, horas, notas) VALUES (?, ?, ?, ?)');
  const result = stmt.run(fecha, materia, horas, notas);
  res.json({ id: result.lastInsertRowid });
});

// Eliminar
router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM estudio WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;