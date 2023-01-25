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

  describe('Global Error Handler', () => {
    it('returns a particular message and 404 status', async () => {
      const res = await request(server).post('/video');
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('file not sent by the client');
    });
    // return request(server)
    //     .get('/test')
    //     .expect('Content-Type', /json/)
    //     .expect(200);
  });
});
