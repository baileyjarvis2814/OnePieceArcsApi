const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

const data = require('./OnePieceArcs.json');

app.get('/api/data', (req, res) => {
  res.json(data);
});

app.get('/api/data/arc/:arc', (req, res) => {
  const { arc } = req.params;
  const item = data.find((d) => d.Arc.toLowerCase() === arc.toLowerCase());
  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
