const express = require('express');
const { scrapeSource } = require('./scrapeSource');

const app = express();

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/get-video/:movieId', async (req, res) => {
  const { movieId } = req.params;
  scrapeSource(movieId, res);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});