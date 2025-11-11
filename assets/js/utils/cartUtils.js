import { getProductStock, updateProductStock } from "./stockUtils.js";

function crearArrayCarrito() {
    let arrayCarrito = [];
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
}

export function cantidadCarrito(){
    const arrayCarrito = getArrayCarrito();
    const total = arrayCarrito.reduce((acum,p) => acum + p.cantidad,0);

    let cantidad = document.getElementById("contador-carrito");
    if (cantidad) {
        cantidad.textContent = total;
        // Mostrar u ocultar el contador según si hay productos
        if (total > 0) {
            cantidad.style.display = 'flex';
        } else {
            cantidad.style.display = 'none';
        }
    }
}

export function getArrayCarrito() {
    if (localStorage.getItem("arrayCarrito") === null) {
        crearArrayCarrito();
    }
   const arrayCarrito = JSON.parse(localStorage.getItem("arrayCarrito"));

   return arrayCarrito;
}

function updateArrayCarrito(arrayCarrito) {
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
}

export function removeProductCarrito(id){
    id = parseInt(id);
    
    const cantidadADevolver = getProductStock(id) + getProductCarrito(id).cantidad;
    let arrayCarrito = getArrayCarrito().filter(product => product.id !== id);

    updateProductStock(id, cantidadADevolver);
    updateArrayCarrito(arrayCarrito);
}

export function getProductCarrito(id) {
    id = parseInt(id);
    const arrayCarrito = getArrayCarrito();
    const index = arrayCarrito.findIndex(product => product.id === id);

    return arrayCarrito[index];
}

export function updateProductCarrito(id, cantidad) {
    id = parseInt(id);
    cantidad = parseInt(cantidad);

    const arrayCarrito = getArrayCarrito();
    const index = arrayCarrito.findIndex(product => product.id === +id);

    if (index === -1) {
        arrayCarrito.push({id, cantidad});
    } else {
        arrayCarrito[index].cantidad += cantidad;
    }

    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
}
// Función para actualizar cantidad de producto en el carrito
export function actualizarCantidadCarrito(id, nuevaCantidad) {
    id = parseInt(id);
    nuevaCantidad = parseInt(nuevaCantidad);
    
    const arrayCarrito = getArrayCarrito();
    const index = arrayCarrito.findIndex(product => product.id === id);
    
    if (index === -1) {
        console.error("Producto no encontrado en el carrito");
        return false;
    }
    
    const cantidadAnterior = arrayCarrito[index].cantidad;
    const diferencia = nuevaCantidad - cantidadAnterior;
    
    // Verificar stock disponible
    const stockDisponible = getProductStock(id);
    
    if (diferencia > stockDisponible) {
        console.error("No hay suficiente stock disponible");
        return false;
    }
    
    // Actualizar cantidad en carrito
    arrayCarrito[index].cantidad = nuevaCantidad;
    updateArrayCarrito(arrayCarrito);
    
    // Actualizar stock
    const nuevoStock = stockDisponible - diferencia;
    updateProductStock(id, nuevoStock);
    
    console.log(`Cantidad actualizada: Producto ${id}, Nueva cantidad: ${nuevaCantidad}`);
    return true;
}
export function vaciarCarrito() {
    let arrayCarrito = getArrayCarrito();
    
    // Usar foreach para procesar cada producto antes de eliminarlo
    arrayCarrito.forEach((producto) => {
        const id = producto.id;
        const cantidadEnCarrito = producto.cantidad;
        
        // Devolver el stock al eliminar cada producto
        const stockActual = getProductStock(id);
        const cantidadADevolver = stockActual + cantidadEnCarrito;
        updateProductStock(id, cantidadADevolver);
        
        console.log(`Producto ${id} eliminado del carrito. Stock devuelto: ${cantidadEnCarrito}`);
    });
    
    // Vaciar completamente el array del carrito
    crearArrayCarrito();
    
    console.log("Carrito vaciado completamente");
}
