const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const defaulColorObject = require('./colors');
const app = express();
app.use(cors());
app.use('/public', express.static('public'));
app.use(express.json());

let customHtml = '';
let colors = defaulColorObject;
let cssContent = '';

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

function generateCSS(name) {
  let defaultCSS = `
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }

    h1 {
      color: #007bff;
    }
  `;

  Object.keys(colors[name]).forEach((key) => {
    defaultCSS += `
      .text-${key}{
        color:${colors[name][key]} ;
      }
      .bg-${key}{
        background-color:${colors[name][key]} ;
      }
      `;
  });
  return defaultCSS;
}

app.post('/api/css', (req, res) => {
  const { body } = req;
  const { name, value } = body;
  colors = {
    ...colors,
    [name]: value,
  };
  cssContent = generateCSS(name);
  fs.writeFile('./public/styles.css', cssContent, (err) => {
    if (err) {
      console.error('Error saving CSS content:', err);
      res.status(500).json({ error: 'Failed to save CSS content' });
    } else {
      res.status(200).json({ message: 'CSS content saved successfully' });
    }
  });
});

app.get('/api/css', (req, res) => {
  res.sendFile('/public/styles.css', { root: __dirname });
});

app.listen(3007, () => {
  console.log('app is listening to port 3002');
});
