const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM sueno ORDER BY fecha DESC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { fecha, hora_dormir, hora_despertar, calidad } = req.body;
  const stmt = db.prepare('INSERT INTO sueno (fecha, hora_dormir, hora_despertar, calidad) VALUES (?, ?, ?, ?)');
  const result = stmt.run(fecha, hora_dormir, hora_despertar, calidad);
  res.json({ id: result.lastInsertRowid });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM sueno WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;