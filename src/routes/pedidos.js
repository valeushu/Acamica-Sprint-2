const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const { is_login_usuario, es_admin } = require("./middleware.js");

//administradores pueden ver todos los pedidos
router.get("/", is_login_usuario, es_admin, (req, res) => {
  res.send(pedidos);
});

//agregar pedido nuevo
//TODO ARREGLAR dir de envio
router.post("/:codigo", is_login_usuario, (req, res) => {
  let { direccionEnvio, metodoPago } = req.body;
  usuario = req.usuario;
  let codigoP = req.params.codigo;
  let pedido_nuevo = new Pedido(usuario.nombre_usuario, metodoPago);
  pedido_nuevo.addProducto(codigoP);

  pedido_nuevo.setDirEnvio(direccionEnvio);

  addPedido(pedido_nuevo);

  res.json({ Pedido: pedido_nuevo });
});

//usuarios pueden ver sus pedidos

router.get("/", is_login_usuario, function (req, res) {
  //TODO: Refactoring con /pedidos
  pedidosUsuario = pedidos.filter(
    (p) => req.usuario.admin || p.usuario == req.usuario.nombre_usuario
  );
  //pedidosUsuario = pedidos.filter(p => req.usuario.admin || (p.usuario == req.usuario.nombre_usuario));
  console.log(pedidosUsuario);
  res.send(pedidosUsuario);
});

//administradores pueden modificar estado del pedido por numero de id del pedido
router.put("/:id/", is_login_usuario, es_admin, (req, res) => {
  //let index = req.usuario_index;
  let estado_nuevo = req.body.estado;
  let idPedido = req.params.id;
  pedido_buscado = pedidos.find((elemento) => elemento.id == idPedido);
  //console.log(index);
  // pedido_buscado.estado = estado_nuevo;
  pedido_buscado.setEstado(estado_nuevo);
  res.send(pedido_buscado);
});

//usuarios pueden modificar pedido (cantidad de productos, eliminar producto,
//agregar producto,)mientras el estado sea pendiente
//TODO:
router.put("/:id/producto/:idP", is_login_usuario, (req, res) => {
  //let index = req.usuario_index;
  //let estado_nuevo = req.body.estado;
  let idPedido = req.params.id;
  let idProducto = req.params.idP;
  pedidosUsuario = pedidos.find((elemento) => elemento.id == idPedido);
  //(pedidosUsuario.productos)
  //productosMod = pedidos
  //console.log(index);
  // pedido_buscado.estado = estado_nuevo;
  //pedido_buscado.setEstado(estado_nuevo);
  console.log(pedidosUsuario.productos.length);
  res.send(pedidosUsuario.productos);
});

module.exports = router;
