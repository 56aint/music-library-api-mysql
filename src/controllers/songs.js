const { Song } = require('../sequelize');
const { Artist } = require('../sequelize');
const { Album } = require('../sequelize');

exports.createSongByalbumId = (req, res) => {
  const { albumId } = req.params;

  Album.findByPk(albumId).then(album => {
    if (!album) {
      res.status(404).json({ error: 'The album could nit be found' });
    } else {
      Song.create(req.body).then(song => {
        song.setAlbum(albumId).then(songCreated => {
          res.status(201).json(songCreated);
        });
      });
    }
  });
};
