const request = require('supertest');
const app = require('../../main.js');

describe('GET /products', () => {
  describe('', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app)
        .get('/products')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(String),
                productName: expect.any(String),
                unitManufacturingCost: expect.any(Number),
                shipmentUnitCost: expect.any(Number),
                monthlyAdvertismentCost: expect.any(Number),
                manufacturingCountry: expect.any(String),
              }),
            ])
          );
        });
    });
  });
});

describe('POST /cogs', () => {
  describe('given id, productName, unitManufacturingCost, shipmentUnitCost, monthlyAdvertismentCost, manufacturingCountry', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app)
        .post('/cogs')
        .send({
          id: 'B078J1F569',
          productName: 'Drawing Stencil Set for Kids with 240+ Shapes.',
          unitManufacturingCost: 5,
          shipmentUnitCost: 10.2,
          monthlyAdvertismentCost: 564.345,
          manufacturingCountry: 'Israel',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'product updated successfully',
              success: true,
            })
          );
        });
    });
  });
});

describe('POST /cogs', () => {
  describe('productName, unitManufacturingCost, shipmentUnitCost, monthlyAdvertismentCost, manufacturingCountry', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app)
        .post('/cogs')
        .send({
          id: 'B078J1F569fdfs',
          productName: 'Drawing Stencil Set for Kids with 240+ Shapes.',
          unitManufacturingCost: 5,
          shipmentUnitCost: 10.2,
          monthlyAdvertismentCost: 564.345,
          manufacturingCountry: 'Israel',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'product id is not available in DB',
              success: false,
            })
          );
        });
    });
  });
});

describe('POST /cogs', () => {
  describe('productName, unitManufacturingCost, shipmentUnitCost, monthlyAdvertismentCost, manufacturingCountry', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app)
        .post('/cogs')
        .send({
          productName: 'Drawing Stencil Set for Kids with 240+ Shapes.',
          unitManufacturingCost: 5,
          shipmentUnitCost: 10.2,
          monthlyAdvertismentCost: 564.345,
          manufacturingCountry: 'Israel',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: 'product id is missing',
              success: false,
            })
          );
        });
    });
  });
});

describe('POST /cogs', () => {
  describe('productName, unitManufacturingCost, shipmentUnitCost, monthlyAdvertismentCost, manufacturingCountry', () => {
    test('should respond with a 500 status code', async () => {
      const response = await request(app)
        .post('/cogs')
        .send({
          id: 'B078J1F569',
          productName: 'Drawing Stencil Set for Kids with 240+ Shapes.',
          unitManufacturingCo: 5,
          shipmentUnitCost: 10.2,
          monthlyAdvertismentCost: 564.345,
          manufacturingCountry: 'Israel',
        })
        .expect('Content-Type', /json/)
        .expect(500)
        .then((response) => {
          expect(response.body).toEqual(
            expect.objectContaining({
              message: "Column 'unitManufacturingCost' cannot be null",
              success: false,
            })
          );
        });
    });
  });
});
