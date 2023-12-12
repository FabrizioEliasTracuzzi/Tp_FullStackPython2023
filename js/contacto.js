function enviarFormulario() {
    // Get form data
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    // Create an object with the form data
    const formData = {
        nombre: nombre,
        correo: correo,
        mensaje: mensaje
    };

    // Send form data to the server using fetch
    fetch('http://localhost:5000/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar el formulario');
        }
        return response.json();
    })
    .then(data => {
        alert('Formulario enviado correctamente');
        // Optionally, redirect to a thank you page or clear the form
        // window.location.href = './thankyou.html';
        // document.getElementById('contactForm').reset();
    })
    .catch(error => {
        console.error(error);
        alert('Error al enviar el formulario');
    });
}

// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');

// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'data',
// });

// app.post('/contacto', (req, res) => {
//     const { nombre, correo, mensaje } = req.body;

//     const sql = 'INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)';
//     connection.query(sql, [nombre, correo, mensaje], (err, result) => {
//         if (err) {
//             console.error('Error inserting data into MySQL:', err);
//             res.status(500).json({ error: 'Error al procesar la solicitud' });
//             return;
//         }

//         console.log('Form data inserted into MySQL:', result);
//         res.json({ success: true });
//     });
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });