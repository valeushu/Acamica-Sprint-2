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

//obtiene todos los productos
app.get("/", is_login_usuario, (req, res) => {
  res.send(productos);
});


//carga de producto nuevo por parte del admin
app.post("/", is_login_usuario, es_admin, (req, res) => {
  let producto = req.body;
  console.log(producto);
  //console.log(req.body.producto);
  producto_nuevo = req.body;
  productos.push(producto_nuevo);
  console.log("Producto agregado");
  res.send(productos);
});

//modifica producto
app.put("/:codigo", is_login_usuario, es_admin, (req, res) => {
  let codigoP = req.params.codigo;
  console.log(`Codigo de producto editado: ${codigoP}`);
  const { codigo, nombre, descripcion, precioVenta, stock } = req.body;
  const producto_mod = req.body;
  console.log(producto_mod);
  if (nombre || descripcion || precioVenta || stock) {
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].codigo == codigoP) {
        productos[i].codigo = codigo;
        productos[i].nombre = nombre;
        productos[i].descripcion = descripcion;
        productos[i].precioVenta = precioVenta;
        productos[i].stock = stock;
      }
    }
    console.log("producto modificado");
    res.send(productos);
  }
});

//elimina producto
app.delete("/:codigo", is_login_usuario, es_admin, (req, res) => {
  let codigoP = req.params.codigo;
  console.log(`Codigo de producto eliminado: ${codigoP}`);
  for (var i = 0; i < productos.length; i++) {
    if (productos[i].codigo == codigoP) {
      productos.splice(i, 1);
    }
  }
  console.log("productos en stock: ");
  console.log(productos);
  res.send(productos);
});

module.exports = app;
