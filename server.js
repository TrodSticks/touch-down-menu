import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;
const OLLAMA_API_URL = 'http://localhost:11434/api/chat';

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint to connect to Ollama
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('Forwarding message to Ollama:', message);

  try {
    const ollamaResponse = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3', // Or another model you have downloaded in Ollama
        messages: [{ role: 'user', content: message }],
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API responded with status ${ollamaResponse.status}`);
    }

    const data = await ollamaResponse.json();
    
    // Send the AI's reply back to the frontend
    res.json({
      reply: data.message.content
    });

  } catch (error) {
    console.error('Error communicating with Ollama:', error);
    res.status(500).json({ error: 'Failed to communicate with the AI model.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Touch Down AI backend server is running on http://localhost:${PORT}`);
});
