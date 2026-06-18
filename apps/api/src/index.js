require('dotenv').config();

const cors = require('cors');
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/posts.routes');
const { success, failure } = require('./lib/response.lib');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  success(res, { status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.use((req, res) => {
  failure(res, 'Route not found', 404);
});

app.use((error, req, res, next) => {
  console.error(error);

  if (error.__isAuthError) {
    return failure(res, error.message, error.status || 400);
  }

  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : error.message || 'Internal server error';
  failure(res, message, 500);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
