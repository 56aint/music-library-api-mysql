/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  beforeEach(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /album/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/albums/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });
    it('returns a 404 and does not create song if the album does not exist', (done) => {
      request(app)
        .post('/albums/1234/song')
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The album could not be found.');

          Song.findAll().then((songs) => {
            expect(songs.length).to.equal(0);
            done();
          });
        });
    });
  });

  describe('with songs in the database', () => {
    let songs;
    beforeEach((done) => {
      Promise.all([
        Song.create({ artistId: artist.id, albumId: album.id, name: 'End of the road' }),
        Song.create({ artistId: artist.id, albumId: album.id, name: ' A song for Mama' }),
        Song.create({ artistId: artist.id, albumId: album.id, name: 'Long season of loneliness' }),
      ]).then((documents) => {
        songs = documents;
        done();
      });
    });

    describe('GET /albums/:albumId/song', () => {
      it('it gets all the songs by albumById', (done) => {
        request(app)
          .get(`/albums/${album.id}/songs`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((song) => {
              const expected = songs.find((a) => a.id === song.id);
              expect(song.artistId).to.equal(artist.id);
              expect(song.albumId).to.equal(album.id);
              expect(song.name).to.equal(expected.name);
              // done();
            });
            done();
          });
      });
      xit('returns a 404 and does not create song if the album does not exist', (done) => {
        request(app)
          .post('/albums/1234/song')
          .send({
            artist: artist.id,
            name: 'Solitude Is Bliss',
          })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');

            Album.findAll().then((albums) => {
              expect(albums.length).to.equal(1);
              done();
            });
          });
      });
    });
  });
});
