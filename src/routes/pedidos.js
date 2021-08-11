const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const {
  is_login_usuario,
  es_admin,
  existe_producto,
} = require("./middleware.js");

//administradores pueden ver todos los pedidos
router.get("/", is_login_usuario, es_admin, (req, res) => {
  res.json({ Pedidos: pedidos });
});

//agregar pedido nuevo
//TODO ARREGLAR dir de envio
router.post("/", is_login_usuario, existe_producto, function (req, res) {
  let { direccionEnvio, metodoPago, indiceProducto } = req.body;
  usuario = req.usuario;
  let producto = productos[indiceProducto];
  console.log(producto);
  let pedido_nuevo = new Pedido(usuario.nombre_usuario, metodoPago);
  pedido_nuevo.addProducto(producto);
  pedido_nuevo.setDirEnvio(direccionEnvio);
  addPedido(pedido_nuevo);
  res.json({ "Pedido nuevo": pedido_nuevo });
});

//usuarios pueden ver sus pedidos
router.get("/usuario", is_login_usuario, function (req, res) {
  pedidosUsuario = pedidos.filter(
    (p) => req.usuario.admin || p.usuario == req.usuario.nombre_usuario
  );
  console.log(pedidosUsuario);
  res.json({ "Pedidos realizados": pedidosUsuario });
});

//administradores pueden modificar estado del pedido por numero de id del pedido
router.put("/estado", is_login_usuario, es_admin, (req, res) => {
  //TODO: mejorar
  let indice_pedido = req.body.indicePedido;
  let estado_nuevo = req.body.estado;
  let pedido_buscado = pedidos[indice_pedido];
  pedido_buscado.setEstado(estado_nuevo);
  res.json({ "Pedido modificado": pedido_buscado });
});

//usuarios pueden modificar pedido (cantidad de productos, eliminar producto,
//agregar producto,)mientras el estado sea pendiente
//TODO:mejorar
router.put("/productos", is_login_usuario, existe_producto, (req, res) => {
  let indice_pedido = req.body.indicePedido;
  let producto = productos[req.body.indiceProducto];
  let pedidosUsuario = pedidos[indice_pedido];
  if (!pedidosUsuario) {
    res.sendStatus(404);
  }
  if (pedidos[indice_pedido].estado != "pendiente") {
    res.send("pedido cerrado");
  }
  pedidosUsuario.addProducto(producto);
  res.json({ "Pedido del usuario ": pedidosUsuario.productos });
});

module.exports = router;
