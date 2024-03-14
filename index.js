const express = require('express');
const { scrapeSource } = require('./scrapeSource');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/get-video/:movieId', async (req, res) => {
  const { movieId } = req.params;
  scrapeSource(movieId, res);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});