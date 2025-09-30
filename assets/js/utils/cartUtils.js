import { getProductStock, updateProductStock } from "./stockUtils.js";

function crearArrayCarrito() {
    let arrayCarrito = [];
    localStorage.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
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
