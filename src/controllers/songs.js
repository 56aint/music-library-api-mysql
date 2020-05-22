const { Song } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');
// const models;
exports.createSongByAlbumId = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      Song.create({
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      }).then(songCreated => {
        res.status(201).json(songCreated);
        console.log(songCreated);
      });
    }
  });
};
exports.getSongsByAlbumId = (req, res) => {
  const { albumId } = req.params;
  // console.log(albumId);
  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      Song.findAll({ include: [{ model: Artist, as: 'artist' }, { model: Album, as: 'album' }] }).then((songs) => {
        res.status(200).json(songs);
        // console.log(songs);
      });
    }
  });
};

exports.getSongsByArtistId = (req, res) => {
  const { artistId } = req.params;
  // console.log(albumId);
  Artist.findByPk(artistId).then(artist => {
    if (!artist) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      Song.findAll({ include: [{ model: Artist, as: 'artist' }, { model: Album, as: 'album' }] }).then((songs) => {
        res.status(200).json(songs);
        // console.log(songs);
      });
    }
  });
};
