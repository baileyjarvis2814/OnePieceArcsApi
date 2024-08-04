const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const data = require('./OnePieceArcs.json');

app.get('/api/data', (req, res) => {
  console.log('Sending data...');
  res.json(data);
});

app.get('/api/data/:arc', (req, res) => {
  const { arc } = req.params;
  const item = data.find((d) => d.Arc.toLowerCase() === arc.toLowerCase());
  if (item) {
    res.json(item);
  } else {
    console.log('Item not found:', arc);
    res.status(404).send({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
