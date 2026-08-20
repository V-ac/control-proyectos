const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./database.db');

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT,
    tipo TEXT DEFAULT 'otro',
    notas TEXT,
    creado_en TEXT DEFAULT (datetime('now','localtime'))
  )
`);

// GET — todos los eventos
router.get('/', (req, res) => {
    const rows = db.prepare('SELECT * FROM eventos ORDER BY fecha ASC, hora ASC').all();
    res.json(rows);
});

// POST — crear evento
router.post('/', (req, res) => {
    const { titulo, fecha, hora, tipo, notas } = req.body;
    const stmt = db.prepare('INSERT INTO eventos (titulo, fecha, hora, tipo, notas) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(titulo, fecha, hora || null, tipo || 'otro', notas || null);
    res.json({ id: result.lastInsertRowid });
});

// PUT — actualizar evento (acepta campos parciales)
router.put('/:id', (req, res) => {
    const actual = db.prepare('SELECT * FROM eventos WHERE id = ?').get(req.params.id);
    if (!actual) return res.status(404).json({ error: 'No existe' });
    const { titulo, fecha, hora, tipo, notas } = req.body;
    db.prepare(`
    UPDATE eventos SET titulo=?, fecha=?, hora=?, tipo=?, notas=?
    WHERE id=?
  `).run(
        titulo ?? actual.titulo,
        fecha ?? actual.fecha,
        hora ?? actual.hora,
        tipo ?? actual.tipo,
        notas ?? actual.notas,
        req.params.id
    );
    res.json({ ok: true });
});

// DELETE — eliminar evento
router.delete('/:id', (req, res) => {
    db.prepare('DELETE FROM eventos WHERE id = ?').run(req.params.id);
    res.json({ ok: true });
});

module.exports = router;