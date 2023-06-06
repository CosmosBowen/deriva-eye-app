const express = require('express');
const axios = require('axios');
const cors = require('cors');
const TOKEN = 'Ag0bVn8rJz6JaDp2OlzPlm0mvyBwVkbGkkKJzzYm6zMvxYVqgS7CN3G4WVm64eOOraapvWpWk4pJvC1wkJoBsO132o';

const app = express();
app.use(cors());

app.get('/hatrac/*', async (req, res) => {
    const url = 'https://dev.eye-ai.org' + req.originalUrl;
    console.log("*Image server complete url:", url);
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            responseType: 'arraybuffer',
        });
        // response.setHeader("Access-Control-Allow-Origin", "*");

        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        res.status(500).send('Error fetching image');
    }
});

app.get('/ermrest/*', async (req, res) => {
    const url = 'https://dev.eye-ai.org' + req.originalUrl;
    console.log("^Data server complete url:", url);

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
            responseType: 'arraybuffer',
        });
        // response.setHeader("Access-Control-Allow-Origin", "*");

        res.send(Buffer.from(response.data, 'binary'));
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3001, function () {
    console.log('CORS-enabled server listening on port 3001');
});
