const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
//const { pedidos, Pedido } = require("../info.js/pedidos.js");
//const { productos, Producto } = require("../info.js/productos.js");
const { mediosDePago, MediosDePago } = require("../info.js/medios de pago.js");
const {
  is_login_usuario,
  es_admin,
  existe_producto,
  existe_pedido,
  valida_metodo_pago,
} = require("./middleware.js");

/**
 * @swagger
 * /mediosDePago:
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

router.get("/", is_login_usuario, function (req, res) {
  console.log(mediosDePago);
  res.json({ "Medios de pago": mediosDePago });
});

/**
 * @swagger
 * /admin:
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
 *           example: -1
 *    responses:
 *       200:
 *         description: Listado de medios de pago
 */

router.get("/admin", is_login_usuario, es_admin, function (req, res) {
  console.log(mediosDePago);
  res.json({ "Medios de pago": mediosDePago });
});

/**
 * @swagger
 * /:
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
 *    responses:
 *       200:
 *         description: medio de pago agregado
 */

router.post("/", is_login_usuario, es_admin, function (req, res) {
  let medioDePago = req.body;
  medioDePagoNueva = new MediosDePago(medioDePago.codigo, medioDePago.nombre);
  mediosDePago.push(medioDePagoNueva);
  res.json({ "Medio de pago agregado": medioDePagoNueva });
});

router.put("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  mediosDePago[indice].codigo = req.body.codigo;
  mediosDePago[indice].nombre = req.body.nombre;
  res.json({ "Medio de pago modificado": mediosDePago[indice] });
});

router.delete("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  mediosDePago.splice(indice, 1);
  res.json({ "Medios de pago": mediosDePago });
});

module.exports = router;
