const express = require('express');
const app = express();

app.use(express.json());

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

app.listen(3000, () => {
  console.log('app is listening to port 3000');
});
