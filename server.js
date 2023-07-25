const express = require('express');
const cors = require('cors');
const defaulColorObject = require('./colors');
const app = express();

app.use(express.json());
app.use(cors());

let customHtml = '';
let colors = defaulColorObject;

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

function generateCSS(params) {
  let defaultCSS = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }

    h1 {
      color: #007bff;
    }
  `;

  Object.keys(colors).forEach((key) => {
    defaultCSS += `
      .text-${key}{
        color:${colors[key]}
      }
      .bg-${key}{
        background-color:${colors[key]}
      }
      `;
  });
}

app.post('/api/css', (req, res) => {
  const { body } = req;
  const { name, value } = body;
  colors = {
    ...colors,
    name: {
      ...colors[name],
      value,
    },
  };
  const cssContent = generateCSS(queryParams);
  res.status(200).send('config is saved');
});

app.get('/api/css', (req, res) => {
  const queryParams = req.query;
  const cssContent = generateCSS(queryParams);

  res.setHeader('Content-Type', 'text/css');
  res.setHeader('Content-Disposition', 'attachment; filename="styles.css"');
  res.status(200).send(cssContent);
});

app.listen(8000, () => {
  console.log('app is listening to port 3002');
});
