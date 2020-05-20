/* src/models/song.js */
module.exports = (sequelize, DataTypes) => {
  const schema = {
    // artist: DataTypes.STRING,
    name: DataTypes.STRING,
  };
  const Song = sequelize.define('Song', schema);
  return Song;
};
