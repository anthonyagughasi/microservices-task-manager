const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Points directly to the Django backend port
const DJANGO_API_URL = 'http://localhost:8000/api/tasks/';

// Express acts as a reverse proxy/gateway to the Django data service
app.get('/api/v1/tasks', async (req, res) => {
    try {
        const response = await axios.get(DJANGO_API_URL);
        res.json({
            source: "Express Gateway via Django Service",
            data: response.data
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error connecting to backend database microservice",
            error: error.message 
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Express gateway architecture running on port ${PORT}`));
