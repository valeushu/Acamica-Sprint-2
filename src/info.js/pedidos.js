const { usuarios, user1, user2, addPedido } = require("./users");
const { productos } = require("./productos");
let pedidos = [];

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
    this.estado = "Pendiente";
    this.montoTotal = 0;
    this.productos = [];
  }

  addProducto(codigo, cantidad) {
    let producto_pedido = productos.find(
      (producto) => producto.codigo == codigo
    );
    if (cantidad != 0) {
      for (let i = 1; i <= cantidad; i++) {
        this.productos.push(producto_pedido);
      }
    }
    
  }
}

let pedido1 = new Pedido(user1, "EF");
//let pedido2 = new Pedido(user2, "TC");

pedido1.addProducto(1, 2);
//pedido2.addProducto(3, 1);

pedidos.push(pedido1);
//pedidos.push(pedido2);

module.exports = { pedidos, Pedido };
