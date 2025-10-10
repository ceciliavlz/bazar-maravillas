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
        <div id="${id}">
            <img src="${img}" alt="${nombre}"/>
            <div class="nombre"> 
                <p>${nombre}</p>
            </div>
            <div class="cantidad">
                <p>Cant. ${cantidad}</p>
            </div>
            <div class="precios">
                <p>P. unitario $${precio.toLocaleString("es-AR")}</p>
                <p>P. total $${(precio * cantidad).toLocaleString("es-AR")}</p>
            </div>
            <button class="eliminar-del-carrito">Eliminar</button>
        </div>
    `
};

function pintarProductosCarrito(){
    const seccionCarrito = document.getElementById('seccion-carrito');

    const compra = document.createElement('div');
    compra.className = "mi-compra";
    compra.innerHTML = `<h2>MIS COMPRAS</h2>`;

    const productos = obtenerProductosCarrito();
    
    const listaProductos = document.createElement('ul');
    listaProductos.innerHTML = '';
    
    productos.forEach(p => {
        const producto = document.createElement('li');
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

    const productos = obtenerProductosCarrito();

    const subtotal = productos.reduce((acum, p) => {
        const { precio, cantidad } = p;
        return acum + (precio * cantidad);
    }, 0);

    resumen.innerHTML =`
        <h3>RESUMEN DE COMPRA</h3>
        <ul class="resumen">
            <li> 
                <p>SubTotal:</p>
                <p>$${subtotal.toLocaleString("es-AR")}</p>
            </li>
            <li>
                <p>Envío:</p>
                <p>Gratis</p>
            </li>
            <li class="total">
                <p>TOTAL:</p>
                <p>$${subtotal.toLocaleString("es-AR")}</p>
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