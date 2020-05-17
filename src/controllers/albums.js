/* src/controller/album.js */

const { Album } = require('../sequelize');
const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  const { artistId } = req.params;

  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.create(req.body).then(album => {
        album.setArtist(artistId).then(albumCreated =>{
          res.status(201).json(albumCreated);
        });
      });
    }
  });
};
