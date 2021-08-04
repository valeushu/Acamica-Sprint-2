const express = require("express");
//const morgan = require('morgan')
const app = express();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const { existe_usuario, is_login_usuario, es_admin } = require("./middleware.js");

//ver todos los pedidos
app.get("/pedido", (req, res) => {
  res.json(pedidos);
});

//agregar pedido nuevo
app.post("/pedido/:codigo/:cantidad", is_login_usuario, (req, res) => {
  let codigoP = req.params.codigo;
  let cantidad = req.params.cantidad;
  const metodoPago = req.body.metodoPago;
  let pedido_nuevo = new Pedido(usuario, metodoPago);
  pedido_nuevo.addProducto(codigoP, cantidad);
  //console.log(pedido_nuevo.productos);
  pedidos.push(pedido_nuevo);
  console.log(usuario);
  usuarios[req.usuario_index].addPedido(codigoP, cantidad);
  res.json({ pedido_nuevo });
});

//usuarios pueden ver sus pedidos
app.get("/favoritos", is_login_usuario, (req, res) => {
  let index = req.usuario_index;
  let user = usuarios[index];
  favoritos = user.pedidoUsuario;
  console.log(user.pedidoUsuario);
  res.send(favoritos);
});

//administradores pueden modificar estado del pedido
app.put("/pedido", is_login_usuario, es_admin, (req, res) => {
  let index = req.usuario_index;
  let user = usuarios[index];
  favoritos = user.pedidoUsuario;
  console.log(user.pedidoUsuario);
  res.send(favoritos);
});

module.exports = app;
