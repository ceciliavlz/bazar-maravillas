import { getArrayCarrito, removeProductCarrito, cantidadCarrito } from "./utils/cartUtils.js";
import { getProductById } from "./utils/productoUtils.js";
import { setPageKeywords } from "./utils/pageUtils.js";

setPageKeywords();

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
        <div id="${id}" role="group" aria-labelledby="nombre-${id}">
            <img src="${img}" alt="${nombre}"/>
            <div class="nombre"> 
                <p>${nombre}</p>
            </div>
            <div class="cantidad" aria-label="Cantidad seleccionada">
                <p>Cant. ${cantidad}</p>
            </div>
            <div class="precios">
                <p>P. unitario $${precio.toLocaleString("es-AR")}</p>
                <p>P. total $${(precio * cantidad).toLocaleString("es-AR")}</p>
            </div>
            <button class="eliminar-del-carrito" aria-label="Eliminar ${nombre} del carrito">
            Eliminar
            </button>
        </div>
    `
};

function pintarProductosCarrito(){
    const seccionCarrito = document.getElementById('seccion-carrito');

    const compra = document.createElement('div');
    compra.className = "mi-compra";
    compra.setAttribute('aria-label', 'Productos en el carrito');
    compra.innerHTML = `<h2>MIS COMPRAS</h2>`;

    const productos = obtenerProductosCarrito();
    
    const listaProductos = document.createElement('ul');
    listaProductos.setAttribute('role', 'list');
    listaProductos.innerHTML = '';
    
    productos.forEach(p => {
        const producto = document.createElement('li');
        producto.setAttribute('role', 'listitem');
        producto.innerHTML = crearProductoFila(p);
        listaProductos.appendChild(producto);
    });

    compra.appendChild(listaProductos);
    seccionCarrito.appendChild(compra);

    document.querySelectorAll('.eliminar-del-carrito').forEach(b => {
        b.addEventListener('click', (e) => {
            removeProductCarrito(b.parentElement.id);
            initCarrito();
        });
    });
}

function pintarResumenCompra(){
    const seccionCarrito = document.getElementById('seccion-carrito');

    const resumen = document.createElement('div');
    resumen.className = "detalles-resumen";
    resumen.setAttribute('aria-label', 'Resumen de compra');

    const productos = obtenerProductosCarrito();

    const subtotal = productos.reduce((acum, p) => {
        const { precio, cantidad } = p;
        return acum + (precio * cantidad);
    }, 0);

    resumen.innerHTML =`
        <h3>RESUMEN DE COMPRA</h3>
        <ul class="resumen" role="list">
            <li> 
                <p>SubTotal:</p>
                <p aria-live="polite">$${subtotal.toLocaleString("es-AR")}</p>
            </li>
            <li>
                <p>Envío:</p>
                <p>Gratis</p>
            </li>
            <li class="total">
                <p>TOTAL:</p>
                <p aria-live="polite">$${subtotal.toLocaleString("es-AR")}</p>
            </li>
        </ul>
        `

    seccionCarrito.appendChild(resumen);
}

function pintarCarritoVacio(){
    const seccionCarrito = document.getElementById('seccion-carrito');
    seccionCarrito.innerHTML = '';

    const carritoVacio = document.createElement('div');
    carritoVacio.className = "carrito-vacio";
    carritoVacio.setAttribute('role', 'alert');
    carritoVacio.setAttribute('aria-live', 'polite');

        carritoVacio.innerHTML = `
        <img class="img-carrito-vacio" src="../assets/img/empty-cart-removebg.png" alt="carrito vacio">
        <p>¡Tu carrito está vacio! Agregá productos desde nuestro catálogo</p>
        <a href="../pages/products.html">Ver productos ➜</a>
    `
    seccionCarrito.appendChild(carritoVacio);
}

function pintarCarrito(){
    const seccionCarrito = document.getElementById('seccion-carrito');
    seccionCarrito.innerHTML = '';

    pintarProductosCarrito();
    pintarResumenCompra();
}

function initCarrito(){
    if(getArrayCarrito().length === 0){
        pintarCarritoVacio();
    } else {
        pintarCarrito()
    }

    cantidadCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("/pages/carrito")) {
        initCarrito();
    }
});