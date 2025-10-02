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
    const seccionCarrito = document.getElementById('seccion-carrito');

    const compra = document.createElement('div');
    compra.className = "mi-compra";

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

    if (getArrayCarrito().length > 0){
        resumen.innerHTML =`
        <h1>Mis compras</h1>
        <p>SubTotal: $${subtotal}</p>
        <p>Envío: $0</p>
        <p>Total: $${subtotal}</p>
        `
    }

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

export function cantidadCarrito(){
    const arrayCarrito = getArrayCarrito();
    const total = arrayCarrito.reduce((acum,p) => acum + p.cantidad,0);

    let cantidad = document.getElementById("contador-carrito");
    cantidad.textContent = total;
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