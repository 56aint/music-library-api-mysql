/* src/routes/artist.js */

const express = require('express');

const artistController = require('../controllers/artists');

const router = express.Router();

router.post('/', artistController.create);
router.get('/', artistController.getListOfArtists);
router.get('/:artistId', artistController.getSingleArtistById);
router.patch('/:id', artistController.updateArtistById);
router.delete('/:id', artistController.deleteArtistById);


module.exports = router;
