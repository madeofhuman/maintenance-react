
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.static('dist'));

app.all('*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT);

export default app;
