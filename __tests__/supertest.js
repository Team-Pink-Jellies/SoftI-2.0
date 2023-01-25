// This test suite will be used for testing of the backend endpoints using the 'supertest' npm package.

const request = require('supertest');
const server = 'http://localhost:3000';
const db = require('../server/models/model');

/**
 * Read the docs! https://www.npmjs.com/package/supertest
 */
describe('Route integration', () => {
  describe('/test', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/test')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
  });
  xdescribe('/markets', () => {
    describe('GET', () => {
      xit('responds with 200 status and application/json content type', () => {});

      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      xit('markets from "DB" json are in body of response', () => {});
    });

    xdescribe('PUT', () => {
      xit('responds with 200 status and application/json content type', () => {});

      xit('responds with the updated market list', () => {});

      xit('responds to invalid request with 400 status and error message in body', () => {});
    });
  });


  describe('unknown route handler', () => {
    describe('GET', () => {
      it('Getting responds with status 404 and "This is not the page you are looking for..."', async () => {
        response = await request(server).get('/nonExistentRoute').expect('Content-Type', /json/).expect(404)
        expect(response.body).toEqual('This is not the page you are looking for...')
      });
    });
    describe('PUT', () => {
      it('Posting responds with status 404 and "This is not the page you are looking for..."', async () => {
        response = await request(server).put('/anotherNonExistentRoute', ['test']).expect('Content-Type', /json/).expect(404)
        expect(response.body).toEqual('This is not the page you are looking for...')
      });
    });
  });
  describe('global error handler', () => {
    it ('gets the default error from the global error handler', async () => {
      response = await request(server).post('/video', []).expect(200)
      

    })
  })
});
