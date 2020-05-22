/* src/routes/artist.js */

const express = require('express');

const artistController = require('../controllers/artists');
const albumController = require('../controllers/albums');
const songController = require('../controllers/songs');

const router = express.Router();

router.post('/', artistController.create);
router.get('/', artistController.getListOfArtists);

router.get('/:artistId', artistController.getSingleArtistById);
router.patch('/:id', artistController.updateArtistById);
router.delete('/:id', artistController.deleteArtistById);

router.post('/:artistId/albums', albumController.create);
router.get('/:artistId/albums', albumController.getAlbumsByArtistId);
// router.patch('/:albumId/albums', albumController.updateAlbumByAlbumId);
// router.delete('/:albumId/albums', albumController.deleteAlbumById);

// router.post('/:albumId/song', songController.createSongByalbumId);
router.get('/:artistId/songs', songController.getSongsByArtistId);


module.exports = router;
