const chai = require('chai'), chaiHttp = require('chai-http'), { expect } = require('chai');
const app = require('../server/index.js');

chai.use(chaiHttp);
chai.should();

describe('API calls', () => {

    let requester;

    before(async () => {
      requester = await chai.request(app).keepOpen();
    });

    describe('Single product API call - GET /priceandinventory/id/:productId', () => {
      // valid ids are 1-100
      const id = 1;
      const invalidId = 0;

      it('should get a product\'s price and inventory count', (done) => {
        requester.get(`/priceandinventory/id/${id}`)
          .end((err, res) => {
            let parsedResponse = JSON.parse(res.text);
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body[0].id).to.equal(1);
            expect(res.body[0]).to.have.property('price');
            expect(res.body[0]).to.have.property('inventory');
            done();
          });
      });

      it('should respond with a 400 status code when requesting an invalid product id', (done) => {
        requester.get(`/priceandinventory/id/${invalidId}`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
      });
    });

    describe('Multiple products API call - POST /priceandinventory/id/multiple', () => {
      // valid ids are 1-100
      const ids = [1, 05, 10, 85];

      it('should get multiple products\' prices and inventory counts', (done) => {
        requester.post('/priceandinventory/id/multiple')
          .send(ids)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body).to.have.length(4);
            expect(res.body[0].id).to.equal(1);
            expect(res.body[0]).to.have.property('price');
            expect(res.body[0]).to.have.property('inventory');
            done();
          });
      });

      it('should respond with a 404 status code when requesting too many products', (done) => {
        let requestLimit = 30;
        let tooManyProductIds = [];
        // push 31 valid ids into an array to send with the request
        for (let i = 1; i <= requestLimit + 1; i++) {
          tooManyProductIds.push(i);
        };

        requester.post('/priceandinventory/id/multiple')
          .send(tooManyProductIds)
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
    });

    describe('testing for new API routes (Create, Update, and Delete)', () => {


      it('should create a new record in the database', (done) => {
        const newRecord = {id: 101, price: 222, inventory: 35};
        requester.post('/priceandinventory/id/createRecord').send(newRecord);
        requester.get(`/priceandinventory/id/101`)
          .end((err, res) => {
            let parsedResponse = JSON.parse(res.text);
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body[0].id).to.equal(101);
            done();
          });
      });

      it('should update an existing record in the database', (done) => {
        const update = {id: 101, price: 250058, inventory: 1};
        requester.put('/priceandinventory/id/updateRecord').send(update)
        .then(() => {
          requester.get(`/priceandinventory/id/101`)
          .end((err, res) => {
            let parsedResponse = JSON.parse(res.text);
            res.should.have.status(200);
            res.body.should.be.a('array');
            expect(res.body[0].id).to.equal(101);
            expect(res.body[0].price).to.equal(250058);
            expect(res.body[0].inventory).to.equal(1);
            done();
          });
        });
      });

      it('should delete an existing record from the database', (done) => {
        const idToDelete = 101;
        requester.delete(`/priceandinventory/id/removeRecord/${idToDelete}`)
        .then(() => {
          requester.get(`/priceandinventory/id/101`)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
        });
      })
    });

    after(async () => {
      await requester.close();
    });
});


