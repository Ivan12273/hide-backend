let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let app = require('../index');

chai.use(chaiHttp);
const url = app;
let token = ''; //Token del usuario autenticado
let testProduct = ''; //El que se va a eliminar

// ====== LOGIN ====== //
describe('[POST /login] Cuando las credeniales proporconadas son válidas', () => {
  it('debe retornar el token de autentificación', (done) => {
    chai.request(url)
      .post('/login')
      .send({ email: "erofaba@gmail.com", password: "11locos." })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        token = res.body.token;
        done();
      });
  });
});

// ====== POST PRODUCT ====== //
describe('[POST /product] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .post('/product')
      .send({
        "name": "Boli de coco",
        "description": "Congelado",
        "stock": "0",
        "price": "5.0",
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});
describe('[POST /product] como usuario autentificado', () => {
  it('Debe crearse el producto si se tiene alguno de los roles [ADMIN, STOCKS]', (done) => {
    chai.request(url)
      .post('/product')
      .set('Authorization', token)
      .send({
        "name": "Boli de chocolate",
        "description": "Congelado",
        "stock": "0",
        "price": "5.0",
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        testProduct = res.body.product; //Se almacena para posteriormente borrarlo
        done();
      });
  });
  it('Debe fallar si no se ingresan los campos obligatorios', (done) => {
    chai.request(url)
      .post('/product')
      .set('Authorization', token)
      .send({
        "description": "Congelado",
        "stock": "0",
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});


// ====== GET PRODUCTS ====== //
describe('[GET /products] Como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get('/products')
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
})
//Rol del usuario [ADMN]
describe('[GET /product:id] Como usuario autentificado', () => {
  it('debe retornar los datos si el usuario es [ADMIN, SALES, STOCKS, PREPARATION]', (done) => {
    chai.request(url)
      .get('/products')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe retornar un arreglo de productos', (done) => {
    chai.request(url)
      .get('/products')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res.body.products).to.be.an('array');
        done();
      });
  });
})

// ====== GET PRODUCT: ID ====== //
describe('[GET /product:id] Como suario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get(`/product/${testProduct._id}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
})
//Rol del usuario [ADMN]
describe('[GET /product:id] Como usuario autentificado', () => {
  it('debe retornar los datos si el usuario es [ADMIN, SALES, STOCKS, PREPARATION]', (done) => {
    chai.request(url)
      .get(`/product/${testProduct._id}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe fallar si el producto con el id proporcionado no existe', (done) => {
    chai.request(url)
      .get('/product/123')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
  });
})

// ====== PUT PRODUCT ====== //
describe('[PUT /product:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .put(`/product/${testProduct._id}`)
      .send({
        "stock": 10,
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[PUT /product:id] como usuario autentificado', () => {
  it('Debe editarse el producto si el usuario es [ADMIN, STOCKS]', (done) => {
    chai.request(url)
      .put(`/product/${testProduct._id}`)
      .set('Authorization', token)
      .send({
        "stock": 10,
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debe fallar si el nombre no es unico', (done) => {
    chai.request(url)
      .put(`/product/${testProduct._id}`)
      .set('Authorization', token)
      .send({
        "name": "Boli de coco",
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== DELETE PRODUCT ====== //
describe('[DELETE /product:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .delete(`/product/${testProduct._id}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[DELETE /product:id] como usuario autentificado', () => {
  it('Debe eliminarse el producto si el usuario es [ADMIN, STOCKS]', (done) => {
    chai.request(url)
      .delete(`/product/${testProduct._id}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debe fallar si el id no existe', (done) => {
    chai.request(url)
      .delete(`/product/1233`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});