const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM proyectos ORDER BY id DESC').all();
  res.json(rows);
});

router.post('/', (req, res) => {
  const { nombre, descripcion, tecnologias, avance_pct, estado } = req.body;
  const stmt = db.prepare('INSERT INTO proyectos (nombre, descripcion, tecnologias, avance_pct, estado) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(nombre, descripcion, tecnologias, avance_pct ?? 0, estado ?? 'En progreso');
  res.json({ id: result.lastInsertRowid });
});

// Actualizar avance
router.put('/:id', (req, res) => {
  const { nombre, descripcion, tecnologias, avance_pct, estado } = req.body;
  db.prepare('UPDATE proyectos SET nombre=?, descripcion=?, tecnologias=?, avance_pct=?, estado=? WHERE id=?')
    .run(nombre, descripcion, tecnologias, avance_pct, estado, req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', (req, res) => {
  db.prepare('DELETE FROM proyectos WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;