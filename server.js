const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const data = require('./OnePieceArcs.json');


app.get('/api/arcs', (req, res) => {
  res.json(data);
});

app.get('/api/:arc', (req, res) => {
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
