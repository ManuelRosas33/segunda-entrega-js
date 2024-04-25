// DECLARAMOS UNA CLASE, A PARTIR DE LA CUAL CREAREMOS LOS OBJETOS.
class Verduras {

     constructor(titulo, precio, unidadMedida, stock) {
     this.titulo = titulo;
     this.precio = precio;
     this.unidadMedida = unidadMedida;
     this.stock = stock;
     }

     descontarStock(cantidad) {
     this.stock = this.stock - cantidad;
     }
}

function aplicarIVA(totalCompra) {
  return totalCompra * 1.21;
}
// FUNCIÓN PARA CALCULAR EL TOTAL A ABONAR DEL CARRITO
function calcularTotal(listado) {
     let total = 0;
     for (const producto of listado) {
     total = total + producto.subtotal;
     }

     return total;
}

// CREACIÓN DE LOS OBJETOS A PARTIR DE LA CLASE ANTES MENCIONADA.
let objLechuga = new Verduras("lechuga", 200, "1kg", 100);
let objTomate = new Verduras("tomate", 150, "1kg", 50);
let objRepollo = new Verduras("repollo", 100, "1kg", 75);


let listadoVerduras = [objLechuga, objTomate, objRepollo];

// DECLARAMOS UN STRING BASE PARA LA CREACIÓN DEL MENSAJE A MOSTRAR COMO SI FUERA EL LISTADO DE VERDURAS
let mensajePrompt ="Por favor seleccione su producto a comprar (por título):\n";


for (const verdura of listadoVerduras) {

     mensajePrompt += `
     Título: ${verdura.titulo}
     Precio: ${verdura.precio}
     Medida: ${verdura.unidadMedida}
     Stock disponible: ${verdura.stock}\n
     `;
}

let verduraPrompt = "";
let carrito = [];

while (verduraPrompt != "finalizar") {

     verduraPrompt = prompt(mensajePrompt);

     if (verduraPrompt != "finalizar") {
     let verduraSeleccionada = listadoVerduras.find((element) => {
          return element.titulo == verduraPrompt;
     });

     if (verduraSeleccionada) {
      // SOLICITO LA CANTIDAD A COMPRAR
          let cantidad = parseFloat(prompt("Qué cantidad desea comprar? (en kg)"));

      // COMPRUEBO SI TENGO STOCK PARA LA CANTIDAD QUE EL USUARIO QUIERE COMPRAR.
          if (verduraSeleccionada.stock >= cantidad) {
          verduraSeleccionada.descontarStock(cantidad);

          // CONSULTAR SI EL PROD YA EXISTE EN EL CARRITO.

          const prodExistente = carrito.findIndex((element) => {
          return element.titulo == verduraPrompt;
          });

          if (prodExistente >= 0) {
          carrito[prodExistente].cantidad =
               carrito[prodExistente].cantidad + cantidad;
          carrito[prodExistente].subtotal =
            carrito[prodExistente].precio * carrito[prodExistente].cantidad;
          } else {
          carrito.push({
               titulo: verduraSeleccionada.titulo,
               precio: verduraSeleccionada.precio,
               cantidad: cantidad,
            subtotal: verduraSeleccionada.precio * cantidad,
          });
          }
          } else {
          console.log("stock NO disponible");
          }
     } else {
          alert("El producto seleccionado no existe, vuelva a intentar");
     }
     }
}

console.log(carrito);

let total = calcularTotal(carrito);

console.log(`El total ha abonar de la compra es de: ${total}`);

let totalConIva = aplicarIVA(total);

console.log(`El total con IVA es de: ${totalConIva}`);
