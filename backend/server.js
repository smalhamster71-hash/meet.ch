// Prototype minimal Express pour inscription (dev only)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const argon2 = require('argon2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Endpoint d'inscription simple (prototype)
app.post('/api/register', async (req, res) => {
  const { email, password, display_name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  try {
    // Vérifier si email existe
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rowCount > 0) return res.status(409).json({ error: 'email already in use' });

    const hash = await argon2.hash(password);
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name, created_at',
      [email.toLowerCase(), hash, display_name || null]
    );

    const user = result.rows[0];
    res.status(201).json({ user });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ error: 'internal_error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));