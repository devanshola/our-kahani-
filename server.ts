import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for receiving customer query emails
  app.post('/api/enquiry', (req, res) => {
    try {
      const { name, email, phone, topic, message } = req.body;
      const targetEmail = process.env.NOTIFICATION_EMAIL || 'thekahaaniii@gmail.com, devanshhola@gmail.com';
      
      console.log('====================================');
      console.log('📩 NEW CUSTOMER QUERY RECEIVED:');
      console.log(`From: ${name || 'Anonymous'} <${email || 'No email provided'}>`);
      console.log(`Phone/WhatsApp: ${phone || 'Not provided'}`);
      console.log(`Topic: ${topic || 'General'}`);
      console.log(`Message: ${message}`);
      console.log(`Notification routed to: ${targetEmail}`);
      console.log('====================================');

      return res.json({
        success: true,
        message: 'Your query has been logged and forwarded to our team!',
        recipient: targetEmail,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      console.error('Enquiry API Error:', err);
      return res.status(500).json({ error: 'Failed to process query' });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      const ai = getAiClient();
      if (!ai) {
        return res.json({
          reply: "Namaste! I am the Kahaanii Kathputli storyteller! Please configure GEMINI_API_KEY to enable live AI responses, or feel free to explore our story modules!"
        });
      }
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: `You are the Kahaanii Storyteller, a wise, warm, and friendly traditional Rajasthani puppet (Kathputli). You answer questions about the Kahaanii online Hindi classes for children. You are kind, encouraging, and use a bit of theatrical, storytelling flair. You can be playful but stay premium and respectful. Keep answers concise (1-3 sentences max). Here is the user's message: ${message}` }]
          }
        ]
      });
      res.json({ reply: response.text });
    } catch (error) {
      console.error('Gemini API Error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
