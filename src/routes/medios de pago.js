/*const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
const { mediosDePago, MediosDePago } = require("../info.js/medios de pago.js");
const {
  is_login_usuario,
  es_admin,
  existe_producto,
  existe_pedido,
  valida_metodo_pago,
} = require("./middleware.js");*/

/**
 * @swagger
 * /api/mediosDePago:
 *  get:
 *    tags: [medios de pago]
 *    summary: medios de Pago
 *    description: Listado de medios de pago
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
 *         description: Listado de formas de pago
 */

/*router.get("/", is_login_usuario, function (req, res) {
  console.log(mediosDePago);
  res.json({ "Medios de pago": mediosDePago });
});*/

/**
 * @swagger
 * /api/mediosDePago/admin:
 *  get:
 *    tags: [medios de pago]
 *    summary: medios de pago
 *    description: Listado de medios de pago
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
 *         description: Listado de medios de pago
 */

/*router.get("/admin", is_login_usuario, es_admin, function (req, res) {
  console.log(mediosDePago);
  res.json({ "Medios de pago": mediosDePago });
});*/

/**
 * @swagger
 * /api/mediosDePago:
 *  post:
 *    tags: [medios de pago]
 *    summary: medios de pago
 *    description: Crea medios de pago
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: Index del usuario logueado
 *         schema:
 *           type: integer
 *           example: -1
 *       - in: body
 *         codigo: id
 *         nombre: medio de pago
 *         description: medio de pago a crear
 *         schema:
 *           type: object
 *           required:
 *             - codigo
 *             - nombre
 *           properties:
 *             codigo:
 *               description: Código del medio de pago
 *               type: string
 *               example: EF
 *             nombre:
 *               description: Nombre del medio de pago
 *               type: string
 *               example: efectivo
 *    responses:
 *       200:
 *         description: medio de pago agregado
 */

/*router.post("/", is_login_usuario, es_admin, function (req, res) {
  let medioDePago = req.body;
  medioDePagoNueva = new MediosDePago(medioDePago.codigo, medioDePago.nombre);
  mediosDePago.push(medioDePagoNueva);
  res.json({ "Medio de pago agregado": medioDePagoNueva });
});*/

/**
 * @swagger
 * /api/mediosDePago:
 *  put:
 *    tags: [medios de pago]
 *    summary: Modificar un medio de pago.
 *    description : Modifica un medio de pago.
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
 *        name: medio de pago
 *        description: medio de pago a modificar
 *        schema:
 *          type: object
 *          required:
 *            - indice
 *            - codigo
 *            - nombre
 *          properties:
 *            indice:
 *              description: indice del mdeio de pago a modificar
 *              type: integer
 *              example: 1
 *            codigo:
 *              description: Código del medio de pago
 *              type: string
 *              example: EF
 *            nombre:
 *              description: Nombre del medio de pago
 *              type: string
 *              example: efectivo
 *    responses:
 *      201:
 *       description: medio de pago modificado
 *
 */

/*router.put("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  mediosDePago[indice].codigo = req.body.codigo;
  mediosDePago[indice].nombre = req.body.nombre;
  res.json({ "Medio de pago modificado": mediosDePago[indice] });
});*/

/**
 * @swagger
 * /api/mediosDePago:
 *  delete:
 *    tags: [medios de pago]
 *    summary: Eliminar medio de pago.
 *    description: Administradores pueden eliminar medio de pago
 *    parameters:
 *       - in: query
 *         name: index
 *         required: true
 *         description: ID de usuario logueado.
 *         schema:
 *           type: integer
 *           example: 0
 *       - in: body
 *         indice: indice
 *         description: indice del medio de pago a eliminar
 *         schema:
 *           type: object
 *           required:
 *             - indice
 *           properties:
 *             indice:
 *               description: indice del meeio de pago a elimianr
 *               type: integer
 *               example: 1
 *    responses:
 *       200:
 *        description: medios de pago eliminado correctamente.
 */

/*router.delete("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  mediosDePago.splice(indice, 1);
  res.json({ "Medios de pago": mediosDePago });
});

module.exports = router;*/
