const express = require("express");
const morgan = require("morgan");
const app = express();
const { productos, Producto } = require("../info.js/productos.js");
const { usuarios, Usuario } = require("../info.js/users.js");

//carga de middlewares
const {
  nuevo_usuario,
  existe_usuario,
  is_login_usuario,
  es_admin,
} = require("./middleware");

//carga de producto nuevo por parte del admin
app.post("/", existe_usuario, es_admin, (req, res) => {
  console.log("esAdmin!");
  console.log(req.body.producto);
  //producto_nuevo = req.body;
  res.send("admin");
});

module.exports = app;
