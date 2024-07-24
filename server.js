const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const data = require('./OnePieceArcs.json');

const parsedData = data.map(item => {
  const values = item["Arc;Start onChapter;TotalChapters;TotalPages;Manga%;Start onEpisode;TotalEpisodes;TotalMinutes(avg 24);Anime%"].split(';');
  return {
    Arc: values[0],
    StartOnChapter: values[1],
    TotalChapters: values[2],
    TotalPages: values[3],
    MangaPercentage: values[4],
    StartOnEpisode: values[5],
    TotalEpisodes: values[6],
    TotalMinutes: values[7],
    AnimePercentage: values[8]
  };
});

app.locals.data = parsedData;

app.get('/api/data', (req, res) => {
  res.json(app.locals.data);
});

app.get('/api/data/:arc', (req, res) => {
  const { arc } = req.params;
  const item = app.locals.data.find((d) => d.Arc.toLowerCase() === arc.toLowerCase());
  if (item) {
    res.json(item);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

app.post('/api/data', (req, res) => {
  const newItem = req.body;
  app.locals.data.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/data/:arc', (req, res) => {
  const { arc } = req.params;
  const updatedItem = req.body;
  const index = app.locals.data.findIndex((d) => d.Arc.toLowerCase() === arc.toLowerCase());
  if (index !== -1) {
    app.locals.data[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

app.delete('/api/data/:arc', (req, res) => {
  const { arc } = req.params;
  const index = app.locals.data.findIndex((d) => d.Arc.toLowerCase() === arc.toLowerCase());
  if (index !== -1) {
    app.locals.data.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ error: 'Item not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
