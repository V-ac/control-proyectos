const Database = require('better-sqlite3');
const db = new Database('./server/database.db');

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS estudio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    materia TEXT NOT NULL,
    horas REAL NOT NULL,
    notas TEXT
  );

  CREATE TABLE IF NOT EXISTS ejercicio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    tipo TEXT NOT NULL,
    duracion_min INTEGER NOT NULL,
    completado INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS sueno (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    hora_dormir TEXT NOT NULL,
    hora_despertar TEXT NOT NULL,
    calidad INTEGER CHECK(calidad BETWEEN 1 AND 5)
  );

  CREATE TABLE IF NOT EXISTS peso (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT NOT NULL,
    peso_kg REAL NOT NULL,
    meta_kg REAL,
    notas TEXT
  );

  CREATE TABLE IF NOT EXISTS proyectos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    tecnologias TEXT,
    avance_pct INTEGER DEFAULT 0 CHECK(avance_pct BETWEEN 0 AND 100),
    estado TEXT DEFAULT 'En progreso'
  );
`);

module.exports = db;