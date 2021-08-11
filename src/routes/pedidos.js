const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const {
  is_login_usuario,
  es_admin,
  existe_producto,
  existe_pedido,
  valida_metodo_pago,
} = require("./middleware.js");

//administradores pueden ver todos los pedidos
router.get("/", is_login_usuario, es_admin, (req, res) => {
  res.json({ Pedidos: pedidos });
});

//agregar pedido nuevo

router.post("/", is_login_usuario, valida_metodo_pago, function (req, res) {
  let { direccionEnvio, metodoPago } = req.body;
  usuario = req.usuario;
  //console.log(producto);
  direccionEnvio = direccionEnvio || usuario.direccionEnvio;
  pedido_nuevo = new Pedido(usuario.nombre_usuario, metodoPago);
  pedido_nuevo.setDirEnvio(direccionEnvio);
  addPedido(pedido_nuevo);
  res.json({ "Pedido nuevo": pedido_nuevo });
});

//usuarios pueden agregar productos al pedido
//TODO:mejorar
router.post("/productos", is_login_usuario, existe_producto, (req, res) => {
  const { indicePedido, indiceProducto } = req.body;
  producto = productos[indiceProducto];
  pedidoUsuario = pedidos[indicePedido];
  if (!pedidoUsuario) {
    res.sendStatus(404);
  }
  if (pedidoUsuario.estado != "pendiente") {
    res.send("Pedido cerrado");
  }
  pedidoUsuario.addProducto(producto);
  res.send({
    resultado:
      "Producto agregado correctamente. El pedido sale: " +
      pedidoUsuario.montoTotal,
  });
});

//usuarios pueden eliminar productos del pedido
//TODO:mejorar
router.delete("/productos", is_login_usuario, existe_pedido, (req, res) => {
  const { indicePedido, indiceProducto } = req.body;
  producto = productos[indiceProducto];
  pedidoUsuario = pedidos[indicePedido];
  precio = producto.getPrecioVenta();
  pedidoUsuario.productos.splice(indiceProducto, 1);
  pedidoUsuario.setMontoTotal(precio);
  res.send({
    resultado:
      "Producto eliminado correctamente. El pedido sale: " +
      pedidoUsuario.montoTotal,
  });
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

module.exports = router;
