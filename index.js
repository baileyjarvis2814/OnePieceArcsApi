const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Morgan for request logging
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'X-Requested-With, Content-Type, Accept'
}));

app.use(morgan('combined')); // Use morgan for logging
app.use(express.json());

const data = require('./OnePieceArcs.json');

app.get('/api/data', (req, res) => {
  console.log('Request Headers:', req.headers);
  res.json(data);
});

app.get('/api/data/arc', (req, res) => {
  const { arc } = req.params;
  console.log('Request Headers:', req.headers);
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
