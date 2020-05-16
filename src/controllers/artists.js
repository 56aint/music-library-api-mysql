/* src/controllers/artists.js */

const { Artist } = require('../sequelize');

exports.create = (req, res) => {
  Artist.create(req.body).then(user => res.status(201).json(user));
};

exports.getListOfArtists = (req, res) => {
  Artist.findAll().then(artists => {
    res.status(200).json(artists);
  });
};

exports.getSingleArtistById = (req, res) => {
  const { artistId } = req.params;
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

exports.updateArtistById = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteArtistById = (req, res) => {
  const { id } = req.params;
  Artist.destroy({ where: { id } }).then((artistDeleted) => {
    if (!artistDeleted) {
      res.status(404).json({ error: 'No artist found, no artist deleted.' });
    } else {
      res.status(204).json(`${artistDeleted} deleted successfully`);
    }
  });
};
