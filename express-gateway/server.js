const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Dynamic URL configuration: Uses the Render environment variable if set,
// otherwise falls back directly to your live production Django microservice.
const DJANGO_API_URL = process.env.DJANGO_API_URL || 'https://task-django-backend.onrender.com/api/tasks/';

// Automatically redirect anyone visiting the root URL to the tasks route
app.get('/', (req, res) => {
    res.redirect('/api/v1/tasks');
});

// Express acts as a reverse proxy/gateway to the Django data service
app.get('/api/v1/tasks', async (req, res) => {
    try {
        const response = await axios.get(DJANGO_API_URL);
        res.json({
            source: "Express Gateway via Django Service",
            data: response.data
        });
    } catch (error) {
        // Log the actual error to the Render dashboard terminal for easy debugging
        console.error("Gateway Connection Error Details:", error.message);
        
        res.status(500).json({ 
            message: "Error connecting to backend database microservice",
            error: error.message || "Connection refused"
        });
    }
});

// Render dynamically sets process.env.PORT, otherwise defaults to 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express gateway architecture running on port ${PORT}`));
