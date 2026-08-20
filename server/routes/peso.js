const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM peso ORDER BY fecha DESC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { fecha, peso_kg, meta_kg, notas } = req.body;
  const stmt = db.prepare('INSERT INTO peso (fecha, peso_kg, meta_kg, notas) VALUES (?, ?, ?, ?)');
  const result = stmt.run(fecha, peso_kg, meta_kg, notas);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM peso WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;