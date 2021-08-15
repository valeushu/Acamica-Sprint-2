const { Router } = require("express");
const router = Router();
const { productos, Producto } = require("../info.js/productos.js");
const { usuarios, Usuario } = require("../info.js/users.js");

//carga de middlewares
const { is_login_usuario, es_admin, existe_producto } = require("./middleware");

/**
 * @swagger
 * /api/productos:
 *  get:
 *    tags: [productos]
 *    summary: productos
 *    description: Listado de productos
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado.
 *         schema:
 *           type: integer
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de productos
 */
router.get("/", is_login_usuario, (req, res) => {
  res.json({ Productos: productos });
});

/**
 * @swagger
 * /api/productos:
 *  post:
 *    tags: [productos]
 *    summary: productos.
 *    description : Agregado de producto.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: index
 *        required: true
 *        description: Index del usuario logueado.
 *        schema:
 *          type: integer
 *          example: -1
 *      - in: body
 *        name: producto
 *        description: producto a crear
 *        schema:
 *          type: object
 *          required:
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precioVenta
 *            - stock
 *          properties:
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *            nombre:
 *              description: Nombre del producto
 *              type: string
 *              example: Ensalada Verde
 *            descripcion:
 *              description: Descripcion del producto
 *              type: string
 *              example: Ensalada verde en base a vegetales
 *            precioVenta:
 *              description: Precio de venta del producto
 *              type: float
 *              example: 100
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1000
 *    responses:
 *      201:
 *       description: Producto creado
 *      401:
 *       description: Producto no creado
 *
 */
router.post("/", is_login_usuario, es_admin, (req, res) => {
  producto_nuevo = req.body;
  productos.push(producto_nuevo);
  res.json({ "Producto creado": producto_nuevo });
});

/**
 * @swagger
 * /api/productos:
 *  put:
 *    tags: [productos]
 *    summary: Modificar un producto.
 *    description : Modifica datos de productos.
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
 *        name: producto
 *        description: producto a modificar
 *        schema:
 *          type: object
 *          required:
 *            - indice
 *            - codigo
 *            - nombre
 *            - descripcion
 *            - precioVenta
 *            - stock
 *          properties:
 *            indice:
 *              description: indice del producto a modificar
 *              type: integer
 *              example: 1
 *            codigo:
 *              description: Código del producto
 *              type: string
 *              example: XX
 *            nombre:
 *              description: Nombre del producto
 *              type: string
 *              example: Ensalada Verde
 *            descripcion:
 *              description: Descripcion del producto
 *              type: string
 *              example: Ensalada verde en base a vegetales
 *            precioVenta:
 *              description: Precio de venta del producto
 *              type: float
 *              example: 100
 *            stock:
 *              description: Stock
 *              type: integer
 *              example: 1000
 *    responses:
 *      201:
 *       description: Listado de productos actualizado
 *
 */
router.put("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  productos[indice].codigo = req.body.codigo;
  productos[indice].nombre = req.body.nombre;
  productos[indice].descripcion = req.body.descripcion;
  productos[indice].precioVenta = req.body.precioVenta;
  productos[indice].stock = req.body.stock;
  res.json({ Productos: productos });
});

/**
 * @swagger
 * /api/productos:
 *  delete:
 *    tags: [productos]
 *    summary: Eliminar un producto.
 *    description: Elimina un producto según el indice del producto.
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: body
 *         name: indice
 *         description: indice del producto a eliminar
 *    responses:
 *       200:
 *        description: producto eliminado correctamente.
 *       404:
 *        description: producto no encontrado.
 *       400:
 *        description: sin stock.
 */
router.delete("/", is_login_usuario, es_admin, existe_producto, (req, res) => {
  let indice = req.body.indice;
  productos.splice(indice, 1);
  res.json({ Productos: productos });
});

module.exports = router;
