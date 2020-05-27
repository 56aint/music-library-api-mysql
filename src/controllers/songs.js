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
  Album.findByPk(albumId).then(song => {
    if (!song) {
      res.status(404).json({ error: 'The album could not be found.' });
    } else {
      /* Song.findAll({ where: { albumId } })
        .then(songs => { res.status(200).json(songs); }); */


      /* Song.findAll({ include: [{ model: Artist, as: 'artist' }, { model: Album, as: 'album' }] }).then((songs) => {
        res.status(200).json(songs);
      }); */
      // console.log(songs);

      Song.findAll({ where: { albumId }, include: [{ model: Artist, as: 'artist' }, { model: 'Album', as: 'album' }] });
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

exports.updateSongById = (req, res) => {
  const { songId } = req.params;
  Song.update(req.body, { where: { id: songId } }).then(([rowsUpdated]) => {
    if (!rowsUpdated) {
      res.status(404).json({ error: 'The song could not be found.' });
    } else {
      res.status(200).json(rowsUpdated);
    }
  });
};

exports.deleteSongById = (req, res) => {
  const { songId } = req.params;

  Song.findByPk(songId).then(song => {
    if (!song) {
      res.status(404).json({ error: 'No deletions as that song could not be found.' });
    } else {
      Song.destroy({ where: { id: songId } }).then((deletedSong) => {
        res.status(204).json(deletedSong);
      });
    }
  });
};
