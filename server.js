const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let customHtml = '';

app.get('/config', (req, res) => {
  res.status(200).json({
    status: 'ok',
    data: customHtml,
  });
});

app.post('/config', (req, res) => {
  const { body } = req;
  customHtml = body.html;
  res.status(200).json({ status: 'ok', message: 'Successfuly added' });
});

app.listen(3001, () => {
  console.log('app is listening to port 3000');
});
