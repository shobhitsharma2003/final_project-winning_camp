import express from 'express';
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/generate-script', async (req, res) => {
    const { genre, theme, characters } = req.body;
    const prompt = `Generate a movie script with the following details:
    Genre: ${genre}, Theme: ${theme}, Characters: ${characters.join(', ')}.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt,
            model: 'text-davinci-003',
            max_tokens: 1500,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        res.json({ script: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send('Error generating script.');
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:5174'));
