const request = require('supertest'); 

const BizRouter = require('./router/BizRouter');

describe('admin biz list route', () => {
  describe('GET /api/biz', () => {
    it('should return an OK status code from the index route', async () => {
      const expectedStatusCode = 200;
      const response = await request(BizRouter).get('/api/users');

      expect(response.status).toEqual(expectedStatusCode)
    });
  });
});