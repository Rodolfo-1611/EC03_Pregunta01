const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/registrar', (req, res) => {
  const { nombre, codigo } = req.body;

  if (!nombre || !codigo) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  db.query('SELECT * FROM productos WHERE codigo = ?', [codigo], (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error en la base de datos' });

    if (resultados.length > 0) {
      return res.status(400).json({ mensaje: 'No se puede crear, código duplicado' });
    }

    db.query('INSERT INTO productos (nombre, codigo) VALUES (?, ?)', [nombre, codigo], (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al insertar el producto' });

      res.status(201).json({ mensaje: 'Producto creado correctamente' });
    });
  });
});

module.exports = router;
