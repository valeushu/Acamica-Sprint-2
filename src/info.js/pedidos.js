const { usuarios, user1, user2 } = require("./users");
const { productos } = require("./productos");
let pedidosId = 0;
let pedidos = [];

addPedido = (pedido) => {
  pedidosId += 1;
  pedido.setNumero(pedidosId);
  pedidos.push(pedido);
};

class Pedido {
  constructor(usuario, formaDePago) {
    // asignación de numero de pedido
    //pedidos.length == 0 ? this.numero = 1 : this.numero = pedidos[pedidos.length - 1] + 1;
    this.usuario = usuario;
    // EF:Efectivo, TC:Tarjeta de Crédito, TD:Tarjeta de Débito, MP:MercadoPago
    this.formaDePago = formaDePago;
    this.direccionEnvio = "Tomar del usuario para registro histórico";
    this.fechaHora = new Date();
    // Pendiente => Confirmado => En preparación => Enviado => Entregado
    this.estado = "pendiente";
    this.montoTotal = 0;
    this.productos = [];
  }

  setDirEnvio(dir) {
    this.direccionEnvio = dir;
  }
  setEstado(estado_nuevo) {
    this.estado = estado_nuevo;
  }
  setNumero(id) {
    this.id = id;
  }

  addProducto(producto) {
    this.montoTotal += parseFloat(producto.precioVenta);
    this.productos.push(producto);
  }

  setMontoTotal(precio) {
    this.montoTotal -= parseFloat(precio);
  }
}

//let pedido1 = new Pedido(user1, "EF");
//let pedido2 = new Pedido(user2, "TC");

//pedido1.addProducto(1, 2);
//pedido2.addProducto(3, 1);

//pedidos.push(pedido1);
//pedidos.push(pedido2);

module.exports = { pedidos, Pedido };
