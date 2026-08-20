const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./database.db');

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS kanban (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    columna TEXT DEFAULT 'pendiente',
    prioridad TEXT DEFAULT 'normal',
    fecha_limite TEXT,
    creado_en TEXT DEFAULT (datetime('now','localtime'))
  )
`);

// GET — todas las tarjetas
router.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM kanban ORDER BY creado_en DESC').all();
    res.json(rows);
});

// POST — crear tarjeta
router.post('/', (req, res) => {
    const { titulo, descripcion, columna, prioridad, fecha_limite } = req.body;
    const stmt = db.prepare(`
    INSERT INTO kanban (titulo, descripcion, columna, prioridad, fecha_limite)
    VALUES (?, ?, ?, ?, ?)
  `);
    const result = stmt.run(
        titulo,
        descripcion || null,
        columna || 'pendiente',
        prioridad || 'normal',
        fecha_limite || null
    );
    res.json({ id: result.lastInsertRowid });
});

// PUT — mover tarjeta de columna o editar
// PUT — mover o editar tarjeta (acepta campos parciales)
router.put('/:id', (req, res) => {
    const actual = db.prepare('SELECT * FROM kanban WHERE id = ?').get(req.params.id);
    if (!actual) return res.status(404).json({ error: 'No encontrado' });
    const { titulo, descripcion, columna, prioridad, fecha_limite } = req.body;
    db.prepare(`
    UPDATE kanban SET
      titulo       = ?,
      descripcion  = ?,
      columna      = ?,
      prioridad    = ?,
      fecha_limite = ?
    WHERE id = ?
  `).run(
        titulo ?? actual.titulo,
        descripcion ?? actual.descripcion,
        columna ?? actual.columna,
        prioridad ?? actual.prioridad,
        fecha_limite ?? actual.fecha_limite,
        req.params.id
    );
    res.json({ ok: true });
});
// DELETE — eliminar tarjeta
router.delete('/:id', (req, res) => {
    db.prepare('DELETE FROM kanban WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
});

module.exports = router;