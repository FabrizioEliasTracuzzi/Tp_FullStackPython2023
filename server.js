const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'data',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL!');
});

app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    connection.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(resultados);
    });
});

app.post('/productos', (req, res) => {
    const { nombre, precio, stock, imagen } = req.body;
    const query = 'INSERT INTO productos (nombre, precio, stock, imagen) VALUES (?, ?, ?, ?)';
    const valores = [nombre, precio, stock, imagen];

    connection.query(query, valores, (error, resultados) => {
        if (error) {
            console.error('Error al crear producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ mensaje: 'Producto creado exitosamente', idProducto: resultados.insertId });
    });
});

app.delete('/productos/:id', (req, res) => {
    const idProducto = req.params.id;
    const query = 'DELETE FROM productos WHERE id = ?';

    connection.query(query, [idProducto], (error, resultado) => {
        if (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        res.json({ mensaje: 'Producto eliminado exitosamente' });
    });
});

app.put('/productos/:id', (req, res) => {
    const idProducto = req.params.id;
    const { nombre, precio, stock, imagen } = req.body;
    
    const query = 'UPDATE productos SET nombre=?, precio=?, stock=?, imagen=? WHERE id=?';
    const valores = [nombre, precio, stock, imagen, idProducto];

    connection.query(query, valores, (error, resultado) => {
        if (error) {
            console.error('Error al actualizar producto:', error);

            if (error.code === 'ER_ROW_NOT_FOUND') {
                res.status(404).json({ error: 'Producto no encontrado' });
            } else {
                res.status(500).json({ error: 'Error interno del servidor' });
            }

            return;
        }

        if (resultado.affectedRows === 0) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        res.json({ mensaje: 'Producto actualizado exitosamente' });
    });
});

// CONTACTO
app.post('/contacto', (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    const sql = 'INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, correo, mensaje], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ error: 'Error al procesar la solicitud' });
            return;
        }

        console.log('Form data inserted into MySQL:', result);
        res.json({ success: true });
    });
});

app.get('/contacto', (req, res) => {
  
    const query = 'SELECT * FROM contacto';
    
    connection.query(query, (error, resultados) => {
        if (error) {
            console.error('Error al obtener consultas:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(resultados);
    });
});

app.delete('/contacto/:id', (req, res) => {
    const consultaId = req.params.id;

    const sql = 'DELETE FROM contacto WHERE id = ?';
    connection.query(sql, [consultaId], (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            res.status(500).json({ error: 'Error al procesar la solicitud' });
            return;
        }

        console.log('Form data deleted from MySQL:', result);
        res.json({ success: true });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});