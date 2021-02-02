let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let app = require('../index');

chai.use(chaiHttp);
const url = app;
// const clientId = ''; // Id del cliente
let token = ''; // Token del Usuario autenticado
let testClientId = ''; // Cliente que se va a eliminar

// ====== LOGIN ====== //

describe('[POST /login] Cuando las credenciales proporcionadas son válidas, el usuario debe tener el rol de ADMIN, SALES, STOCKS O DELIVERINGS para las funciones de cliente', () => {
  it('debe retornar el token de autentificación', (done) => {
    chai.request(url)
      .post('/login')
      .send({ email: "erofaba@gmail.com", password: "11locos." })
      .end(function (err, res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        token = res.body.token;
        done();
      });
  });
});

// ====== GET CLIENTS ====== //

describe('[GET /clients] Como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get('/clients')
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

//Rol del usuario [SALES]
describe('[GET /clients] Como usuario autentificado', () => {
  it('debe retornar los datos si el usuario es [ADMIN], [SALES], [STOCKS] O [DELIVERINGS]', (done) => {
    chai.request(url)
      .get('/clients')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe retornar un arreglo de clientes', (done) => {
    chai.request(url)
      .get('/clients')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res.body.clients).to.be.an('array');
        done();
      });
  });
});

// ====== POST CLIENT ====== //

describe('[POST /client] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .post('/client')
      .send({
        "name": "Prueba",
        "phone": "9851061890",
        "email": "prueba@gmail.com",
        "address": "calle 32 n321 x 24 % 34",
        "addressDescription": "Casa amarilla",
        "coordinates": "20.689515, -88.197526"
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[POST /client] como usuario autentificado', () => {
  it('Debe crearse el cliente', (done) => {
    chai.request(url)
      .post('/client')
      .set('Authorization', token)
      .send({
        "name": "Prueba",
        "phone": "9851061890",
        "email": "prueba@gmail.com",
        "address": "calle 32 n321 x 24 % 34",
        "addressDescription": "Casa amarilla",
        "coordinates": "20.689515, -88.197526"
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        testClientId = res.body.client._id; // Se almacena para posteriormente borrarlo
        done();
      });
  });
  it('Debe fallar si no se ingresan los campos obligatorios', (done) => {
    chai.request(url)
      .post('/client')
      .set('Authorization', token)
      .send({
        "phone": "9851061890",
        "email": "prueba@gmail.com"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Debe fallar si el email no es unico', (done) => {
    chai.request(url)
      .post('/client')
      .set('Authorization', token)
      .send({
        "name": "Prueba",
        "phone": "9851061890",
        "email": "bby@gmail.com",
        "address": "calle 32 n321 x 24 % 34",
        "addressDescription": "Casa amarilla",
        "coordinates": "20.689515, -88.197526"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== GET CLIENT:ID ====== //

describe('[GET /client:id] Como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get(`/client/${testClientId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

//Rol del usuario [SALES]
describe('[GET /client:id] Como usuario autentificado', () => {
  it('debe retornar los datos del cliente si el usuario es [ADMIN], [SALES], [STOCKS] O [DELIVERINGS]', (done) => {
    chai.request(url)
      .get(`/client/${testClientId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe fallar si el cliente con el id proporcionado no existe', (done) => {
    chai.request(url)
      .get('/client/123')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== PUT CLIENT ====== //

describe('[PUT /client:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .put(`/client/${testClientId}`)
      .send({
        "phone": "9851041660",
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[PUT /client:id] como usuario autentificado', () => {
  it('Debe editarse el cliente si el usuario es [ADMIN], [SALES], [STOCKS] O [DELIVERINGS]', (done) => {
    chai.request(url)
      .put(`/client/${testClientId}`)
      .set('Authorization', token)
      .send({
        "phone": "9851041660",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// ====== DELETE CLIENT ====== //

describe('[DELETE /client:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .delete(`/client/${testClientId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[DELETE /client:id] como usuario autentificado', () => {
  it('Debe eliminarse el cliente si el usuario es [ADMIN], [SALES], [STOCKS] O [DELIVERINGS]', (done) => {
    chai.request(url)
      .delete(`/client/${testClientId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debe fallar si el id no existe', (done) => {
    chai.request(url)
      .delete(`/client/1233`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});