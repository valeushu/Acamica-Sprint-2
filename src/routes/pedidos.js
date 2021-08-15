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

/**
 * @swagger
 * /api/pedidos:
 *  get:
 *    tags: [pedidos]
 *    summary: devuelve todos los pedidos realizados
 *    description : Listado de pedidos.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *    responses:
 *       200:
 *         description: Listado de pedidos
 */
router.get("/", is_login_usuario, es_admin, (req, res) => {
  res.json({ Pedidos: pedidos });
});

/**
 * @swagger
 * /api/pedidos:
 *  post:
 *    tags: [pedidos]
 *    summary: pedido nuevo
 *    description: Crea pedido nuevo
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         direccionEnvio: direccion de envio
 *         metodoPago: metodo de pago
 *         schema:
 *           type: object
 *           required:
 *             - direccionEnvio
 *             - metodoPago
 *           properties:
 *             direccionEnvio:
 *               description: direccion del usuario
 *               type: string
 *               example: maipu 140
 *             metodoPago:
 *               description: metodo de pago elegido del usuario
 *               type: string
 *               example: EF
 *    responses:
 *       200:
 *         description: pedido agregado
 */
router.post("/", is_login_usuario, valida_metodo_pago, function (req, res) {
  let { direccionEnvio, metodoPago } = req.body;
  usuario = req.usuario;
  direccionEnvio = direccionEnvio || usuario.direccionEnvio;
  pedido_nuevo = new Pedido(usuario.nombre_usuario, metodoPago);
  pedido_nuevo.setDirEnvio(direccionEnvio);
  addPedido(pedido_nuevo);
  res.json({ "Pedido nuevo": pedido_nuevo });
});

/**
 * @swagger
 * /api/pedidos/productos:
 *  post:
 *    tags: [pedidos]
 *    summary: Agrega productos al pedido
 *    description: Agrega productos al pedido
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: body
 *         indicePedido: indice del pedido
 *         indiceProducto: indice del producto
 *         schema:
 *           type: object
 *           required:
 *             - indicePedido
 *             - indiceProducto
 *           properties:
 *             indicePedido:
 *               description: indice del pedido a modificar
 *               type: integer
 *               example: 0
 *             indiceProducto:
 *               description: indice del producto a agregar al pedido
 *               type: integer
 *               example: 1
 *    responses:
 *       200:
 *         description: producto agregado correctamente
 */
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

/**
 * @swagger
 * /api/pedidos/productos:
 *  delete:
 *    tags: [pedidos]
 *    summary: Eliminar un producto del pedido.
 *    description: usuarios pueden eliminar un producto del pedido
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: body
 *         indicePedido: indice del pedido
 *         indiceProducto: indice del producto
 *         schema:
 *           type: object
 *           required:
 *             - indicePedido
 *             - indiceProducto
 *           properties:
 *             indicePedido:
 *               description: indice del pedido a modificar
 *               type: integer
 *               example: 0
 *             indiceProducto:
 *               description: indice del producto a eliminar del pedido
 *               type: integer
 *               example: 1
 *    responses:
 *       200:
 *        description: medios de pago eliminado correctamente.
 */

router.delete("/productos", is_login_usuario, existe_pedido, (req, res) => {
  const { indicePedido, indiceProducto } = req.body;
  producto = pedidos[indicePedido].productos[indiceProducto];
  pedidoUsuario = pedidos[indicePedido];
  if (producto) {
    precio = producto.getPrecioVenta();
    pedidoUsuario.productos.splice(indiceProducto, 1);
    pedidoUsuario.setMontoTotal(precio);
    res.json({
      resultado:
        "Producto eliminado correctamente. El pedido sale: " +
        pedidoUsuario.montoTotal,
      Pedido: pedidoUsuario,
    });
  } else {
    res.send("producto no encontrado");
  }
});

/**
 * @swagger
 * /api/pedidos/usuario:
 *  get:
 *    tags: [pedidos]
 *    summary: devuelve todos los pedidos del usuario
 *    description : Listado de pedidos.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: 1
 *    responses:
 *       200:
 *         description: Listado de pedidos del usuario
 */
router.get("/usuario", is_login_usuario, function (req, res) {
  pedidosUsuario = pedidos.filter(
    (p) => req.usuario.admin || p.usuario == req.usuario.nombre_usuario
  );
  console.log(pedidosUsuario);
  res.json({ "Pedidos realizados": pedidosUsuario });
});

/**
 * @swagger
 * /api/pedidos/estado:
 *  put:
 *    tags: [pedidos]
 *    summary: Modificar el estado de un pedido
 *    description : Modifica estado.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: 0
 *      - in: body
 *        name: pedido
 *        description: pedido a modoficar
 *        schema:
 *          type: object
 *          required:
 *            - indicePedido
 *            - estado
 *          properties:
 *            indicePedido:
 *              description: indice del pedido a modificar
 *              type: integer
 *              example: 1
 *            estado:
 *              description: estado del pedido
 *              type: string
 *              example: pendiente
 *    responses:
 *      201:
 *       description: pedido modificado
 */
router.put("/estado", is_login_usuario, es_admin, (req, res) => {
  let indice_pedido = req.body.indicePedido;
  let estado_nuevo = req.body.estado;
  let pedido_buscado = pedidos[indice_pedido];
  pedido_buscado.setEstado(estado_nuevo);
  res.json({ "Pedido modificado": pedido_buscado });
});

module.exports = router;
