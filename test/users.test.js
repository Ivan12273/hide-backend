let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let app = require('../index');

chai.use(chaiHttp);
const url = app;
let token = ''; //Token del usuario autenticado
let userId = ''; //Usuario autenticado
let testUserId = ''; //El que se va a eliminar

// ====== LOGIN ====== //
describe('[POST /login] Cuando las credenciales proporcionadas son inválidas', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .post('/login')
      .send({ email: "erofaba@gmail.com", password: "invalidPass" })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('[POST /login] Cuando las credeniales proporconadas son válidas', () => {
  it('debe retornar el token de autentificación', (done) => {
    chai.request(url)
      .post('/login')
      .send({ email: "erofaba@gmail.com", password: "11locos." })
      .end(function (err, res) {
        // console.log(res.body);
        expect(res).to.have.status(200);
        token = res.body.token;
        userId = res.body.user._id;
        done();
      });
  });
});

// ====== GET USERS ====== //

describe('[GET /users] Como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get('/users')
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

//Rol del usuario [ADMN]
describe('[GET /users] Como usuario autentificado', () => {
  it('debe retornar los datos si el usuario es [ADMIN]', (done) => {
    chai.request(url)
      .get('/users')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe retornar un arreglo de usuarios', (done) => {
    chai.request(url)
      .get('/users')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res.body.users).to.be.an('array');
        done();
      });
  });
  it('no debe retornar el password de los usuarios', (done) => {
    chai.request(url)
      .get('/users')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res.body.users[0]).to.not.contain.keys('password');
        done();
      });
  });
});

// ====== GET USER:ID ====== //

describe('[GET /user:id] Como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .get(`/user/${userId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

//Rol del usuario [ADMN]
describe('[GET /user:id] Como usuario autentificado', () => {
  it('debe retornar los datos si el usuario es [ADMIN] o el id corresponde al usuario autenticado', (done) => {
    chai.request(url)
      .get(`/user/${userId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('debe fallar si el usuario con el id proporcionado no existe', (done) => {
    chai.request(url)
      .get('/user/123')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('no debe retornar el password del usuario', (done) => {
    chai.request(url)
      .get(`/user/${userId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res.body.user).to.not.contain.keys('password');
        done();
      });
  });
});

// ====== POST USER ====== //

describe('[POST /user] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .post('/user')
      .send({
        "role": "SALES",
        "name": "Ivannnas Roman Burgos Ramirez",
        "birthday": "16/01/2022",
        "email": "email22222@gmail.com",
        "password": "password"
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[POST /user] como usuario autentificado', () => {
  it('Debe crearse el usuario', (done) => {
    chai.request(url)
      .post('/user')
      .set('Authorization', token)
      .send({
        "role": "SALES",
        "name": "Ivan Román Burgos Ramirez",
        "birthday": "16/01/2022",
        "email": "corre1o@gmail.com",
        "password": "password"
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        testUserId = res.body.user._id; //Se almacena para posteriormente borrarlo
        done();
      });
  });
  it('Debe fallar si no se ingresan los campos obligatorios', (done) => {
    chai.request(url)
      .post('/user')
      .set('Authorization', token)
      .send({
        "role": "SALES",
        "birthday": "16/01/2022",
        "email": "corre1o@gmail.com",
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Debe fallar si el email no es unico', (done) => {
    chai.request(url)
      .post('/user')
      .set('Authorization', token)
      .send({
        "role": "SALES",
        "name": "Ivan Román Burgos Ramirez",
        "birthday": "16/01/2022",
        "email": "erofaba@gmail.com",
        "password": "password"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== PUT USER ====== //

describe('[PUT /user:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .put(`/user/${userId}`)
      .send({
        "role": "SALES",
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[PUT /user:id] como usuario autentificado', () => {
  it('Debe editarse el usuario si el usuario es [ADMIN] o el id corresponde al usuario autenticado', (done) => {
    chai.request(url)
      .put(`/user/${userId}`)
      .set('Authorization', token)
      .send({
        "role": "ADMIN",
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debe fallar si el email no es unico', (done) => {
    chai.request(url)
      .put(`/user/${userId}`)
      .set('Authorization', token)
      .send({
        "role": "SALES",
        "email": "fabipreciosa@miamor.com"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== DELETE USER ====== //


describe('[DELETE /user:id] como usuario no autentificado', () => {
  it('debe fallar la petición', (done) => {
    chai.request(url)
      .delete(`/user/${testUserId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[DELETE /user:id] como usuario autentificado', () => {
  it('Debe eliminarse el usuario si el usuario es [ADMIN]', (done) => {
    chai.request(url)
      .delete(`/user/${testUserId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Debe fallar si el id no existe', (done) => {
    chai.request(url)
      .delete(`/user/1233`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});