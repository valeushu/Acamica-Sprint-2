const { Router } = require("express");
const router = Router();
const { productos, Producto } = require("../info.js/productos.js");
const { usuarios, Usuario } = require("../info.js/users.js");

//carga de middlewares
const {
  nuevo_usuario,
  existe_usuario,
  is_login_usuario,
  es_admin,
} = require("./middleware");

//obtiene todos los productos
router.get("/", is_login_usuario, (req, res) => {
  res.json({ Productos: productos });
});

//carga de producto nuevo por parte del admin
router.post("/", is_login_usuario, es_admin, (req, res) => {
  producto_nuevo = req.body;
  productos.push(producto_nuevo);
  console.log("Producto agregado");
  res.json({ "Producto creado": producto_nuevo });
});

//modifica producto
router.put("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  productos[indice].codigo = req.body.codigo;
  productos[indice].nombre = req.body.nombre;
  productos[indice].descripcion = req.body.descripcion;
  productos[indice].precioVenta = req.body.precioVenta;
  productos[indice].stock = req.body.stock;
  res.json({ Productos: productos });
});

//elimina producto
router.delete("/", is_login_usuario, es_admin, (req, res) => {
  let indice = req.body.indice;
  productos.splice(indice, 1);
  res.json({ Productos: productos });
});

module.exports = router;
