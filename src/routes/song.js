/* src/routes/song.js */

const express = require('express');

const songController = require('../controllers/songs');
const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');


const router = express.Router();

router.patch('/:songId', songController.updateSongById);

router.delete('/:songId', songController.deleteSongById);


module.exports = router;
