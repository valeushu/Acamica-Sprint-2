const express = require("express");
//const morgan = require('morgan')
const app = express();

const { usuarios } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const { existe_usuario } = require("./middleware.js");

//agregar pedido nuevo
app.post("/pedido", existe_usuario, (req, res) => {
  const metodoPago = req.body.metodoPago;
  let pedido_nuevo = new Pedido ( req.nombre_usuario, metodoPago);
  console.log(req.usuario);
  console.log(pedido_nuevo);
  pedidos.push(pedido_nuevo);
  res.send(pedidos);
});

//ver todos los pedidos
app.get("/pedido", (req, res) => {
  res.json(pedidos);
});

module.exports = app;
