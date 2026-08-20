const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM ejercicio ORDER BY fecha DESC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { fecha, tipo, duracion_min, completado } = req.body;
  const stmt = db.prepare('INSERT INTO ejercicio (fecha, tipo, duracion_min, completado) VALUES (?, ?, ?, ?)');
  const result = stmt.run(fecha, tipo, duracion_min, completado ?? 1);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM ejercicio WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;