const { Router } = require("express");
const router = Router();

const { usuarios, Usuario } = require("../info.js/users.js");
const { pedidos, Pedido } = require("../info.js/pedidos.js");
const { productos, Producto } = require("../info.js/productos.js");
const { mediosDePago, MediosDePago } = require("../info.js/pago.js");
const {
  is_login_usuario,
  es_admin,
  existe_producto,
  existe_pedido,
  valida_metodo_pago,
} = require("./middleware.js");

router.get("/", is_login_usuario, function (req, res) {
  console.log(mediosDePago);
  res.json({ "Medios de pago": mediosDePago });
});

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

module.exports = router;