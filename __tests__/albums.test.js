/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  beforeEach(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).to.equal('InnerSpeaker');
            expect(album.year).to.equal(2010);
            expect(album.artistId).to.equal(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).to.equal(0);
            done();
          });
        });
    });
  });

  describe('with albums in the database', () => {
    // let artists;
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ artistId: artist.id, name: 'Album One', year: 1999 }),
        Album.create({ artistId: artist.id, name: 'Album Two', year: 1998 }),
        Album.create({ artistId: artist.id, name: 'Album Three', year: 1997 }),
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });


    describe('GET /artists/:artistId/albums', () => {
      it('gets all the album by artist', (done) => {
        request(app)
          .get(`/artists/${artist.id}/albums`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((album) => {
              const expected = albums.find((a) => a.id === album.id);
              console.log(artist.id, 'is the artist id from test');
              console.log(album.id, 'is the album id');
              console.log(album.year, 'is the album year');
              console.log(expected.year, 'is the expected year');

              expect(album.artistId).to.equal(artist.id);
              expect(album.name).to.equal(expected.name);
              expect(album.year).to.equal(expected.year);
            });
            done();
          });
      });
      it('returns a 404 and does not create an album if the artist does not exist', (done) => {
        request(app)
          .get('/artists/1234/albums')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
          });
        done();
      });
    });

    describe('PATCH /artists/:artistId/albums', () => {
      it('updates albums updatable values by albumId', (done) => {
        const album = albums[0];
        request(app)
          .patch(`/artists/${album.id}/albums`)
          .send({ year: 2000 })
          .then((res) => {
            expect(res.status).to.equal(200);
            Album.findByPk(album.id, { raw: true }).then((updateAlbum) => {
              expect(updateAlbum.year).to.equal(2000);
              done();
            });
          });
      });
      it('returns a 404 if the album does not exist', (done) => {
        request(app)
          .patch('/artists/1234/albums')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
        // done();
      });
    });

    describe('DELETE /artists/:artistId/albums', () => {
      it('it deletes album by albumId', (done) => {
        const album = albums[0];
        request(app)
          .delete(`/artists/${album.id}/albums`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Album.findByPk(album.id, { raw: true }).then((updatedAlbum) => {
              expect(updatedAlbum).to.equal(null);
              done();
            });
          });
      });
      xit('returns a 404 if the album does not exist', (done) => {
        request(app)
          .delete('/artists/1234/albums')
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
          });
        done();
      });
    });
  });
});
