const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5000;

// Middleware para manejar solicitudes JSON
app.use(express.json());

// URL del servicio externo
const EXTERNAL_SERVICE_URL = 'http://www.raydelto.org/agenda.php';

// Ruta para listar contactos
app.get('/contacts', async (req, res) => {
    try {
        // Realiza una solicitud GET al servicio externo
        const response = await axios.get(EXTERNAL_SERVICE_URL);

        // Responde con los datos obtenidos del servicio
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error al obtener contactos:', error.message);
        res.status(500).json({ error: 'No se pudo obtener la lista de contactos.' });
    }
});

// Ruta para almacenar un nuevo contacto
app.post('/contacts', async (req, res) => {
    const { name, phone } = req.body;

    // Validación de campos obligatorios
    if (!name || !phone) {
        return res.status(400).json({ error: 'Los campos name y phone son obligatorios.' });
    }

    try {
        // Realiza una solicitud POST al servicio externo con los datos del nuevo contacto
        const response = await axios.post(EXTERNAL_SERVICE_URL, { nombre: name, telefono: phone });

        // Responde con el estado del almacenamiento
        res.status(201).json({ message: 'Contacto almacenado exitosamente.', data: response.data });
    } catch (error) {
        console.error('Error al almacenar contacto:', error.message);
        res.status(500).json({ error: 'No se pudo almacenar el contacto.' });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
