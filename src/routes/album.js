/* src/routes/album.js */

const express = require('express');

const albumController = require('../controllers/albums');
const songController = require('../controllers/songs');

const router = express.Router();

router.patch('/:albumId/albums', albumController.updateAlbumByAlbumId);
router.delete('/:albumId/albums', albumController.deleteAlbumById);

router.post('/:albumId/song', songController.createSongByAlbumId);

router.get('/:albumId/songs', songController.getSongsByAlbumId);

module.exports = router;
