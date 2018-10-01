
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.static('dist'));

app.all('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT);

module.exports = app;
