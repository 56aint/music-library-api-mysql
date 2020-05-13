const Sequelize = require('sequelize');
const ArtistModel = require('./models/artist');
// const AlbumModel = require('./models/album');
// const SongModel = require('./models/song');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const sequelize = new Sequelize('music-library-api-db', 'root', process.env.DB_PASSWORD, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    // logging: false,
  });

  const Artist = ArtistModel(sequelize, Sequelize);
  // const Album = AlbumModel(sequelize, Sequelize);
  // const Song = SongModel(sequelize, Sequelize);

  sequelize.sync({ alter: true });
  return {
    Artist,
    // Album,
    // Song,
  };
};

module.exports = setupDatabase();
