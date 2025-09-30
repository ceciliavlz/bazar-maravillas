import { getArrayCarrito, removeProductCarrito } from "./utils/cartUtils.js";
import { getProductById } from "./utils/productoUtils.js";

export function obtenerProductosCarrito(){
    const carrito = getArrayCarrito();
    let productos = [];

    for(let productoCarrito of carrito){
        const producto = getProductById(productoCarrito.id);
        productos.push({...producto, cantidad: productoCarrito.cantidad});
    }

    return productos;
}

function crearProductoFila(p){
    const { id, nombre, precio, img, cantidad } = p;
    return `
        <div id="${id}">
            <img src="${img}"/>
            <p>${nombre}</p>
            <p>Cantidad: ${cantidad}</p>
            <p>Precio unitario ${precio}</p>
            <p>Precio total ${precio * cantidad}</p>

            <button class="eliminar-del-carrito">Eliminar</button>
        </div>
    `
};

function pintarProductosCarrito(){
    const seccionMiCompra = document.getElementById('mi-compra');
    seccionMiCompra.innerHTML = '';

    const productos = obtenerProductosCarrito();
    
    const listaProductos = document.createElement('ul');
    listaProductos.innerHTML = '';
    
    productos.forEach(p => {
        const producto = document.createElement('li');
        producto.innerHTML = crearProductoFila(p);

        listaProductos.appendChild(producto);
    });

    seccionMiCompra.appendChild(listaProductos);

    document.querySelectorAll('.eliminar-del-carrito').forEach(b => {
        b.addEventListener('click', (e) => {
            removeProductCarrito(b.parentElement.id);
            initCarrito();
            pintarResumenCompra();
        });
    });
}

function pintarResumenCompra(){
    const resumenCompra = document.getElementById('resumen-compra');
    resumenCompra.innerHTML = '';
    
    const resumen = document.createElement('div')

    const productos = obtenerProductosCarrito();

    const subtotal = productos.reduce((acum, p) => {
        const { precio, cantidad } = p;
        return acum + (precio * cantidad);
    }, 0);

    resumen.innerHTML = `
        <p>SubTotal: $${subtotal}</p>
        <p>Envío: $0</p>
        <p>Total: $${subtotal}</p>
    `
    resumenCompra.appendChild(resumen)
}

export function cantidadCarrito(){
    const arrayCarrito = getArrayCarrito();
    const total = arrayCarrito.reduce((acum,p) => acum + p.cantidad,0);

    let cantidad = document.getElementById("contador-carrito");
    cantidad.textContent = total;
}

function initCarrito(){
    pintarProductosCarrito();
    pintarResumenCompra();
    cantidadCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/pages/carrito.html") {
        initCarrito();
    }
});