const express = require("express");
//const morgan = require('morgan')
const app = express();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const {
  existe_usuario,
  is_login_usuario,
  es_admin,
} = require("./middleware.js");

//ver todos los pedidos
app.get("/", (req, res) => {
  res.json(pedidos);
});

//agregar pedido nuevo
//TODO ARREGLAR
app.post("/:codigo/:cantidad", is_login_usuario, (req, res) => {
  let { direccionEnvio, metodoPago } = req.body;
  usuario = req.usuario;
  console.log(req.body);
  let codigoP = req.params.codigo;
  let cantidad = req.params.cantidad;
  let pedido_nuevo = new Pedido(usuario.nombre_usuario, metodoPago);
  pedido_nuevo.addProducto(codigoP, cantidad);
  //console.log(pedido_nuevo.productos);
  addPedido(pedido_nuevo);
  console.log(pedido_nuevo);
  console.log(usuario);

  res.json({ pedido_nuevo });
});

//usuarios pueden ver sus pedidos

app.get("/", is_login_usuario, function (req, res) {
  //TODO: Refactoring con /pedidos
  pedidosUsuario = pedidos.find(
    (p) => req.usuario.admin || p.usuario == req.usuario.nombre_usuario
  );
  //pedidosUsuario = pedidos.filter(p => req.usuario.admin || (p.usuario == req.usuario.nombre_usuario));
  console.log(pedidosUsuario);
  res.send(pedidosUsuario);
});

//administradores pueden modificar estado del pedido
//TODO: modificar codigo porque no funciona
app.put("/:id/", is_login_usuario, es_admin, (req, res) => {
  //let index = req.usuario_index;
  let estado_nuevo = req.body;
  let idPedido = req.params.id;
  pedido_buscado = pedidos.find((elemento) => elemento.id == idPedido);
  //console.log(index);
  pedido_buscado.estado = estado_nuevo;
  res.send(pedido_buscado);
});

module.exports = app;
