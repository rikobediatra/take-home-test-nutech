require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL connected');

    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT} (env: ${process.env.NODE_ENV || 'development'})`,
      );
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
