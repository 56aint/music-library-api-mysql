const express = require('express');
// const artistControllers = require('./controllers/artists');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');

// app.post('/artists, artistControllers.create');

const app = express();

app.use(express.json());

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);

module.exports = app;
