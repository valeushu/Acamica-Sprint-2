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
  constructor(usuario, metodoPago) {
    // asignación de numero de pedido
    //pedidos.length == 0 ? this.numero = 1 : this.numero = pedidos[pedidos.length - 1] + 1;
    this.usuario = usuario;
    // EF:Efectivo, TC:Tarjeta de Crédito, TD:Tarjeta de Débito, MP:MercadoPago
    this.metodoPago = metodoPago;
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


module.exports = { pedidos, Pedido };
