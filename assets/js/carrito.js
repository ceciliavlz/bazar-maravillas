import { getArrayCarrito, removeProductCarrito, cantidadCarrito, updateProductCarrito, crearArrayCarrito } from "./utils/cartUtils.js";
import { getProductById } from "../../api/api.js";
import { setPageKeywords } from "./utils/pageUtils.js";
import { menuHamburguesa,navPages } from "./utils/pageUtils.js";

setPageKeywords();

export async function obtenerProductosCarrito(){
    const carrito = getArrayCarrito();
    let productos = [];

    for(let productoCarrito of carrito){
        const producto = await getProductById(productoCarrito.id);
        productos.push({...producto, cantidad: productoCarrito.cantidad});
    }

    return productos;
}

function crearProductoFila(p){
    const { id, nombre, precio, img, cantidad } = p;
    return `
        <div id="${id}" role="group" aria-labelledby="nombre-${id}">
            <img src="${img.baja}" alt="${nombre}"/>
            <div class="nombre-precio"> 
                <div class="nombre"> 
                    <p>${nombre}</p>
                </div>
                <div class="precio-y-eliminar">
                    <div class="precios">
                        <p>$${precio.toLocaleString("es-AR")} x ${cantidad.toLocaleString("es-AR")} = $${(precio * cantidad).toLocaleString("es-AR")}</p>
                    </div>
                    <form class="cambiar-cantidad" aria-label="Formulario para cambiar cantidad a comprar" action="input">
                        <input
                            type="number"
                            class="cantidad"
                            value="${cantidad}"
                            min="1"
                            max="${p.stock}"
                            aria-describedby="stock-info-${p.id}">
                    </form>
                    <button class="eliminar-del-carrito boton" aria-label="Eliminar ${nombre} del carrito">
                        🗑
                    </button>
                </div>
            </div>

        </div>
    `
};

async function pintarProductosCarrito(){
    const seccionCarrito = document.getElementById('seccion-carrito');

    const compra = document.createElement('div');
    compra.className = "mi-compra";
    compra.setAttribute('aria-label', 'Productos en el carrito');
    compra.innerHTML = `<div id="compras-titulo"><h2>MIS COMPRAS</h2><button id="vaciar-carrito" class="boton">VACIAR CARRITO</button></div>`;

    const productos = await obtenerProductosCarrito();
    
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
            let id = b.parentElement.parentElement.parentElement.id;
            let p = productos.find(item => item.id === parseInt(id));
            if (confirm(`Quieres eliminar ${p.cantidad} x ${p.nombre} de tu compra?`)) {
                removeProductCarrito(id);
            }
            initCarrito();
        });
    });

    document.querySelectorAll('.cantidad').forEach(form => {
        form.addEventListener('change', () => {
            let id = form.parentElement.parentElement.parentElement.parentElement.id;
            let p = productos.find(item => item.id === parseInt(id));
            updateProductCarrito(id, form.value - p.cantidad);
            initCarrito();
        });
    });

    const vaciarCarrito = document.getElementById("vaciar-carrito");
    vaciarCarrito.addEventListener("click", () => {
        if (confirm("¿Desea vaciar su carrito?")) {
            crearArrayCarrito();
            initCarrito();
        }
    })
}

async function pintarResumenCompra(){
    const seccionCarrito = document.getElementById('seccion-carrito');
    seccionCarrito.appendChild(await resumenHTML());
}

export async function resumenHTML() {
    const resumen = document.createElement('div');
    resumen.className = "detalles-resumen";
    resumen.setAttribute('aria-label', 'Resumen de compra');

    const productos = await obtenerProductosCarrito();

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
        <div class="botones-resumen">
            <a href="../pages/confirmacion.html" class="boton btn-finalizar">Finalizar compra</a>
            <a href="../pages/products.html" class="boton">Seguir comprando</a>
        </div>
        `
    return resumen
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
        <a href="../pages/products.html" class="boton">Ver productos ➜</a>
    `
    seccionCarrito.appendChild(carritoVacio);
}

async function pintarCarrito(){
    const seccionCarrito = document.getElementById('seccion-carrito');
    seccionCarrito.innerHTML = '';

    pintarProductosCarrito();
    await pintarResumenCompra();
}

function initCarrito(){
    if(getArrayCarrito().length === 0){
        pintarCarritoVacio();
    } else {
        pintarCarrito()
    }
    navPages();
    menuHamburguesa();
    cantidadCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("/pages/carrito")) {
        initCarrito();
    }
});

window.addEventListener("storage", (e) => {
    if (e.key === "arrayCarrito") {
        if (window.location.pathname.includes("/pages/carrito")) {
            initCarrito();
        }
    }
})