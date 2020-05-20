const { Song } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');
// const models;
exports.createSongByAlbumId = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found' });
    } else {
      Song.create({
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      }).then(songCreated => {
        res.status(201).json(songCreated);
        // console.log(songCreated);
      });
    }
  });

  /* Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found' });
    } else {
      Song.create({
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      }).then(song => {
        song.setAlbum(albumId).then(songCreated => {
          res.status(201).json(songCreated);
        });
      });
    }
  }); */

/* Album.findAll({ include: [{ model: Artist, as: 'artist' }, { model: Album, as: 'album' }] }).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could not be found' });
    } else {
      Song.create({
        name: req.body.name,
        albumId: album.id,
        artistId: album.artistId,
      }).then(songCreated => {
        res.status(201).json(songCreated);
      });
    }
  }); */
};
