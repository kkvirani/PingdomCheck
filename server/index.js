const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
// Load .env from the repository root so developers can keep a single .env there
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const app = express();
app.use(cors());
app.use(express.json());

const PINGDOM_TOKEN = process.env.PINGDOM_TOKEN || '';
if (!PINGDOM_TOKEN) {
  console.warn('Warning: PINGDOM_TOKEN not set. /api/checks will return mock data.');
} else {
  console.log('PINGDOM_TOKEN loaded from .env (hidden)');
}

app.get('/api/checks', async (req, res) => {
  if (!PINGDOM_TOKEN) {
    return res.json({ checks: [
      { id: 1, name: 'Mock site', status: 'up', last_ping: Date.now(), url: 'https://example.com' }
    ]});
  }

  try {
    const resp = await axios.get('https://api.pingdom.com/api/3.1/checks', {
      headers: {
        Authorization: `Bearer ${PINGDOM_TOKEN}`
      }
    });
    res.json(resp.data);
  } catch (err) {
    console.error('Pingdom API error', err.message);
    res.status(502).json({ error: 'Failed to fetch from Pingdom', detail: err.toString() });
  }
});

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
