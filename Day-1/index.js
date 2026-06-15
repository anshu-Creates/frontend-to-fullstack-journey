require('dotenv').config();
import express from 'express';

const app = express();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/login', (req, res) => {
  res.send('Login page');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});