let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
let app = require('../index')

chai.use(chaiHttp);
const url = app;
let token = ''; //Token del usuario autenticado
let orderId = ''; //Orden creada

// ====== LOGIN ====== //
describe('[POST /login] Cuando las credenciales proporcionadas son validas', () => {
  it('debe pasar la petición', (done) => {
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

// ====== POST ORDER ====== //
describe('[POST /order] Cuando el usuario no esta autenticado', () => {
  it('no se debe crear la orden', (done) => {
    chai.request(url)
      .post('/order')
      .send({
        "user_id": "5faefac20ed8612c085814f2",
        "client_id": "5fc6fc52f5fb962f30e3892e",
        "status": "Nuevo",
        "date": "2020/12/28",
        "details": [
          {
            "product_id": "5fc19154298887267cced552",
            "quantity": 10,
          },
          {
            "product_id": "5fc1926d2b6bb518d444e704",
            "quantity": 20,
          }
        ],
        "address": "Calle 53 #321 x 14a Francisco Villa Oriente",
        "phone": "9991339966"
      })
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[POST /order] Cuando el usuario esta autentificado', () => {
  //DATOS CORRECTOS
  it('se debe crear la orden si todos los datos son correctos', (done) => {
    chai.request(url)
      .post('/order')
      .set('Authorization', token)
      .send({
        "user_id": "5faefac20ed8612c085814f2",
        "client_id": "5fc6fc52f5fb962f30e3892e",
        "status": "Nuevo",
        "date": "2020/12/28",
        "details": [
          {
            "product_id": "5fc19154298887267cced552",
            "quantity": 10,
          },
          {
            "product_id": "5fc1926d2b6bb518d444e704",
            "quantity": 20,
          }
        ],
        "address": "Calle 53 #321 x 14a Francisco Villa Oriente",
        "phone": "9991339966"
      })
      .end(function (err, res) {
        expect(res).to.have.status(201);
        // console.log(res.body.order);
        orderId = res.body.order._id;
        done();
      });
  });
  //ID de usuario no exite
  it('no se debe crear la orden si el id del usuario no existe', (done) => {
    chai.request(url)
      .post('/order')
      .set('Authorization', token)
      .send({
        "user_id": "a1",
        "client_id": "5fc6fc52f5fb962f30e3892e",
        "status": "Nuevo",
        "date": "2020/12/28",
        "details": [
          {
            "product_id": "5fc19154298887267cced552",
            "quantity": 10,
          },
          {
            "product_id": "5fc1926d2b6bb518d444e704",
            "quantity": 20,
          }
        ],
        "address": "Calle 53 #321 x 14a Francisco Villa Oriente",
        "phone": "9991339966"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        console.log(res.body.order);
        done();
      });
  });
  //ID de cliente no exist
  it('no se debe crear la orden si el id del cliente no existe', (done) => {
    chai.request(url)
      .post('/order')
      .set('Authorization', token)
      .send({
        "user_id": "5faefac20ed8612c085814f2",
        "client_id": "asd1",
        "status": "Nuevo",
        "date": "2020/12/28",
        "details": [
          {
            "product_id": "5fc19154298887267cced552",
            "quantity": 10,
          },
          {
            "product_id": "5fc1926d2b6bb518d444e704",
            "quantity": 20,
          }
        ],
        "address": "Calle 53 #321 x 14a Francisco Villa Oriente",
        "phone": "9991339966"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        console.log(res.body.order);
        done();
      });
  });
  //Se omiten datos
  it('no se debe crear la orden si no se ponen todos los datos obligatorios', (done) => {
    chai.request(url)
      .post('/order')
      .set('Authorization', token)
      .send({
        "date": "2020/12/28",
        "details": [
          {
            "product_id": "5fc19154298887267cced552",
            "quantity": 10,
          },
          {
            "product_id": "5fc1926d2b6bb518d444e704",
            "quantity": 20,
          }
        ],
        "address": "Calle 53 #321 x 14a Francisco Villa Oriente",
        "phone": "9991339966"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        console.log(res.body.order);
        done();
      });
  });
});

// ====== GET ORDERS ====== //
describe('[GET /orders] Cuando el usuario no esta autenticado', () => {
  it('no se deben obtener las ordenes', (done) => {
    chai.request(url)
      .get('/orders')
      // .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[GET /orders] Cuando el usuario esta autenticado', () => {
  it('se deben obtener todas las ordenes', (done) => {
    chai.request(url)
      .get('/orders')
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});

// ====== GET ORDER ====== //

describe('[GET /order:id] Cuando el usuario no esta autenticado', () => {
  it('no se deben obtener la orden', (done) => {
    chai.request(url)
      .get(`/order/${orderId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[GET /order:id] Cuando el usuario esta autenticado', () => {
  it('se debe obtener la orden', (done) => {
    chai.request(url)
      .get(`/order/${orderId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('No se debe obtener la orden si no existe', (done) => {
    chai.request(url)
      .get(`/order/00as1`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== PUT ORDER ====== //

describe('[PUT /order:id] Cuando el usuario no esta autenticado', () => {
  it('no se deben actualizar la orden', (done) => {
    chai.request(url)
      .put(`/order/${orderId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[PUT /order:id] Cuando el usuario esta autenticado', () => {
  it('se debe editar la orden', (done) => {
    chai.request(url)
      .put(`/order/${orderId}`)
      .set('Authorization', token)
      .send({
        "phone": "9991996633",
        "status": "Transito"
      })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('No se debe editar la orden si no existe', (done) => {
    chai.request(url)
      .put(`/order/00as1`)
      .set('Authorization', token)
      .send({
        "phone": "9991996633"
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('No se debe editar la orden si los tipos de datos son incorrectos', (done) => {
    chai.request(url)
      .put(`/order/00as1`)
      .set('Authorization', token)
      .send({
        "phone": 122
      })
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});

// ====== DELETE ORDER ====== //

describe('[DELETE /order:id] Cuando el usuario no esta autenticado', () => {
  it('no se debe deliminar la orden', (done) => {
    chai.request(url)
      .delete(`/order/${orderId}`)
      .end(function (err, res) {
        expect(res).to.have.status(403);
        done();
      });
  });
});

describe('[DELETE /order:id] Cuando el usuario esta autenticado', () => {
  it('se debe eliminar la orden', (done) => {
    chai.request(url)
      .delete(`/order/${orderId}`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('No se debe eliminar la orden si no existe', (done) => {
    chai.request(url)
      .delete(`/order/00as1`)
      .set('Authorization', token)
      .end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
  });
});