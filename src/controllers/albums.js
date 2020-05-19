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
        album.setArtist(artistId).then(albumCreated => {
          res.status(201).json(albumCreated);
        });
      });
    }
  });
};

exports.getAlbumsByArtistId = (req, res) => {
  const { artistId } = req.params;
  console.log(artistId, 'is the artist id from controller');
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Album.findAll({ where: { artistId } }).then((albums) => {
        res.status(200).json(albums);
      });
    }
  });
};

exports.updateAlbumByAlbumId = (req, res) => {
  // const { artistId } = req.params;
  const { albumId } = req.params;
  Album.update(req.body, { where: { id: albumId } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};


exports.deleteAlbumById = (req, res) => {
  const { albumId } = req.params;
  Album.destroy({ where: { id: albumId } }).then((albumDeleted) => {
    if (!albumDeleted) {
      res.status(404).json({ error: 'No album found, no artist deleted.' });
    } else {
      res.status(204).json(`${albumDeleted} deleted successfully`);
    }
  });
};
