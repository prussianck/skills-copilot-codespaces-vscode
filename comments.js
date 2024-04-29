// Create web Server
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const commentsPath = path.join(__dirname, 'comments.json');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const comments = JSON.parse(data);
    res.json(comments);
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, (err, data) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.sendStatus(201);
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
