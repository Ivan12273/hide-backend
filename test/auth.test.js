let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let app = require('../index')

chai.use(chaiHttp);
const url = app;
let token = ''; //Token del usuario autenticado
let userId = ''; //Usuario autentcado

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

describe('[POST /login] Cuando las credenciales proporcionadas son válidas', () => {
  it('debe retornar el usuario y el token de autenticacion', (done) => {
    chai.request(url)
      .post('/login')
      .send({ email: "erofaba@gmail.com", password: "11locos." })
      .end(function (err, res) {
        token = res.body.token;
        userId = res.body.user._id;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('[POST /reset-password] Cuando el correo electronico es válido', () => {
  it('debe retornar un status 200 de confirmación', (done) => {
    chai.request(url)
      .post('/reset-password')
      .send({ email: "erofaba@gmail.com" })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});