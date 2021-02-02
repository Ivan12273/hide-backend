'use strict'

var Order = require('../models/order');
var Product = require('../models/product');

// ESCRIBIR HISTORIAL
var { Parser } = require('json2csv')
var pdf = require('html-pdf');

var controller = {

  createOrder: function (req, res) {
    var order = new Order();

    var params = req.body;
    order.user_id = params.user_id;
    order.client_id = params.client_id;
    order.status = params.status;
    order.date = params.date;
    order.details = params.details;
    order.address = params.address;
    order.phone = params.phone;
    var details = params.details;

    var prodsId = [];

    //agrego los id del los productos a un array
    details.forEach(el => {
      prodsId.push(el.product_id);
    });

    //Busco todos los productos por id.
    Product.find({ _id: { $in: prodsId } })
      .exec((err, prod) => {
        if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

        if (!prod) return res.status(404).send({ message: 'No hay productos que mostrar.' });

        var enough = true;
        details.forEach((e, i) => {
          if (prod[i].stock < details[i].quantity) {
            console.log("No hay suficiente de " + prod[i].name);
            enough = false;
          }
        });

        if (!enough) {
          return res.status(400).send({ message: "No hay suficiente stock de producto" });
        }

        order.save((err, orderStored) => {
          if (err) return res.status(400).send({ message: err });

          if (!orderStored) return res.status(404).send({ message: 'No se ha podido guardar la orden.' });

          //Reducimos el producto en stock
          details.forEach((element) => {
            reduceStock(element.product_id, element.quantity)
          })

          return res.status(201).send({ order: orderStored });
        });

      });
  },

  getOrder: function (req, res) {
    var orderId = req.params.id;

    if (orderId == null) return res.status(404).send({ message: 'La orden no existe.' });

    Order.findById(orderId)
      .populate('client_id', ['name'])
      .populate('details.product_id', ['name', 'price'])
      .exec((err, order) => {
        if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

        if (!order) return res.status(404).send({ message: 'No existe el pedido solicitado.' });

        return res.status(200).send({ order });
      });

  },

  getAllOrders: function (req, res) {
    Order.find({})
      .populate('client_id', ['name'])
      .populate('details.product_id', ['name', 'price'])
      .exec((err, orders) => {

        if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

        if (!orders) return res.status(404).send({ message: 'No hay pedidos que mostrar.' });

        return res.status(200).send({ orders });
      });
  },

  getHistoryOrdersPDF: function (req, res) {
    var pdfContent = `
    <style>
    h1 {
      font-family: arial, sans-serif;
      text-align: center;
    }
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td, th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
    </style>
    <h1>Lista de ordenes</h1>
    <br>
    <table>
      <tr>
        <th>Monto</th>
        <th>Fecha</th>
        <th>Cliente</th>
        <th>Dirección</th>
        <th>Status</th>
      </tr>
    `;

    let done = ["Cancelado", "Entregado"]
    Order.find({ status: { $in: done } })
    .populate('client_id', ['name'])
    .populate('details.product_id', ['name', 'price'])
    .exec((err, orders) => {

      if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

      if (!orders) return res.status(404).send({ message: 'No hay pedidos que mostrar.' });

      orders.forEach(el => {
        var dets = el.details;
        var amount = 0;

        dets.forEach(ele => {
          amount = amount + (ele.quantity * ele.product_id.price)
        })

        var newTable = `
          <tr>
            <td>` + amount + `</td>
            <td>` + el.date + `</td>
            <td>` + el.client_id.name + `</td>
            <td>` + el.address + `</td>
            <td>` + el.status + `</td>
          </tr>
        `;

        pdfContent = pdfContent + newTable;
      })

      pdfContent = pdfContent + `</table>`;
      let date = Date.now();
      let name = `Reporte-${date}.pdf`;
      pdf.create(pdfContent).toBuffer(function (error, buffer) {
        try {
          if (error) return res.send(error);
          res.type('pdf');
          res.header('Content-Type', 'text/pdf');
          res.attachment(name);
          res.end(buffer, 'binary');
        } catch (err) {
          console.log('error:', error.message);
          res.status(500).send(error.message);
        }
      });

    });
  },

  getHistoryOrders: function (req, res) {
    let done = ["Cancelado", "Entregado"]

    Order.find({ status: { $in: done } })
      .populate('client_id', ['name'])
      .populate('details.product_id', ['name', 'price'])
      .exec((err, orders) => {

        if (err) return res.status(400).send({ message: 'Error al devolver los datos.' });

        if (!orders) return res.status(404).send({ message: 'No hay pedidos que mostrar.' });

        var reps = [];
        orders.forEach(el => {
          var dets = el.details;
          var amount = 0;

          dets.forEach(ele => {
            // console.log(JSON.stringify(ele));
            // console.log(`${ele.product_id.name} - ${ele.quantity} - ${ele.product_id.price}`);
            amount = amount + (ele.quantity * ele.product_id.price)
          })

          var rep = {
            monto: amount,
            fecha: el.date,
            cliente: el.client_id.name,
            direccion: el.address,
            status: el.status
          }

          reps.push(rep);
        })

        let date = Date.now();
        let name = `Reporte-${date}.csv`;
        const fields = [
          {
            label: 'Monto',
            value: 'monto'
          },
          {
            label: 'Fecha',
            value: 'fecha'
          },
          {
            label: 'Cliente',
            value: 'cliente'
          },
          {
            label: 'Direccion',
            value: 'direccion'
          },
          {
            label: 'Status',
            value: 'status'
          },
        ]

        const json2csv = new Parser({ fields: fields })

        try {
          const csv = json2csv.parse(reps)
          res.header('Content-Type', 'text/csv');
          res.attachment(name)
          res.status(200).send(csv)
        } catch (error) {
          console.log('error:', error.message)
          res.status(500).send(error.message)
        }
      });
  },

  updateOrder: function (req, res) {
    var orderId = req.params.id;
    var update = req.body;

    Order.findByIdAndUpdate(orderId, update, { new: true, runValidators: true, context: 'query' }, (err, orderUpdated) => {
      if (err) return res.status(400).send({ message: err.errors });

      if (!orderUpdated) return res.status(404).send({ message: 'No existe el pedido para actualizar' });

      let details = orderUpdated.details;

      if (update.status == 'Cancelado') {
        details.forEach(element => {
          restoreStock(element.product_id, element.quantity);
        })
      }

      return res.status(200).send({ order: orderUpdated });
    });
  },

  deleteOrder: function (req, res) {
    var orderId = req.params.id;

    Order.findByIdAndRemove(orderId, (err, orderRemoved) => {
      if (err) return res.status(400).send({ message: 'No se ha podido borrar el pedido.' });

      if (!orderRemoved) return res.status(404).send({ message: 'No se puede eliminar el pedido.' });

      let details = orderRemoved.details;

      if (orderRemoved.status != 'Cancelado') {
        details.forEach(element => {
          restoreStock(element.product_id, element.quantity);
        })
      }


      return res.status(200).send({
        order: orderRemoved
      });
    });
  }

};


const reduceStock = (id, quantity) => {
  Product.findOneAndUpdate({ _id: id },
    { $inc: { 'stock': -quantity } },
    { new: true },
    function (err, response) {
      // console.log(response);
    });
}

const restoreStock = (id, quantity) => {
  Product.findOneAndUpdate({ _id: id },
    { $inc: { 'stock': quantity } },
    { new: true },
    function (err, response) {
      // console.log(response);
    });
}

module.exports = controller;