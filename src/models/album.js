/* src/models/album.js */
module.exports = (sequelize, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER,
    // artist: DataTypes.STRING,
  };
  const Album = sequelize.define('Album', schema);
  return Album;
};
