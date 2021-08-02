let productos = [];

class Producto {
  constructor(codigo, nombre, descripcion, precioVenta, stock) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioVenta = precioVenta;
    this.stock = stock;
  }
  getCodido() {
    return this.codigo;
  }

  getPrecioVenta() {
    return this.precioVenta;
  }

  getStock() {
    return this.stock;
  }

  setStock(nuevoStock) {
    return (this.stock = nuevoStock);
  }
}

let hamburguesa1 = new Producto(
  "HB1",
  "Hamburguesa Clasic",
  "Hamburguesa clásico con JyQ",
  "349,99",
  "100"
);
let hamburguesa2 = new Producto(
  "HB2",
  "Hamburguesa Verde",
  "Hamburguesa en base a vegetales",
  "399,99",
  "250"
);
let hamburguesa3 = new Producto(
  "HB3",
  "Hamburguesa Power",
  "Hamburguesa con JyQ, tomate y cebolla",
  "449,99",
  "602"
);

let ensaladaCesar = new Producto(
  "EC",
  "Ensalada César",
  "Ensalada César",
  "566,99",
  "20"
);

productos = [hamburguesa1, hamburguesa2, hamburguesa3, ensaladaCesar];
//console.log("Información de productos cargada correctamente.", productos);

module.exports = { productos, Producto };
