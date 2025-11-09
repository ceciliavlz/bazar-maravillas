import { getArrayCarrito, removeProductCarrito, cantidadCarrito, vaciarCarrito,
    actualizarCantidadCarrito,
    getProductCarrito } from "./utils/cartUtils.js";
import { getProductById } from "../../api/api.js";
import { setPageKeywords } from "./utils/pageUtils.js";
import { menuHamburguesa,navPages } from "./utils/pageUtils.js";
import { getProductStock } from "./utils/stockUtils.js";


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
    const stockDisponible = getProductStock(id);
    
    return `
        <div id="${id}" role="group" aria-labelledby="nombre-${id}">
            <img src="${img.baja}" alt="${nombre}"/>
            <div class="nombre"> 
                <p>${nombre}</p>
            </div>
            <div class="cantidad" aria-label="Cantidad seleccionada">
                <label for="cantidad-${id}">Cantidad:</label>
                <input
                    type="number"
                    id="cantidad-${id}"
                    value="${cantidad}"
                    min="1"
                    max="${stockDisponible + cantidad}"
                    aria-describedby="stock-info-${id}">
                <button class="actualizar-cantidad boton" data-id="${id}" aria-label="Actualizar cantidad de ${nombre}">
                    Actualizar
                </button>
            </div>
            <div class="precios">
                <p>P. unitario $${precio.toLocaleString("es-AR")}</p>
                <p class="precio-total" data-precio="${precio}">P. total $${(precio * cantidad).toLocaleString("es-AR")}</p>
            </div>
            <button class="eliminar-del-carrito boton" aria-label="Eliminar ${nombre} del carrito">
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

    // Eventos para eliminar productos
    document.querySelectorAll('.eliminar-del-carrito').forEach(b => {
        b.addEventListener('click', (e) => {
            removeProductCarrito(b.parentElement.id);
            initCarrito();
        });
    });
    
    // NUEVO: Eventos para actualizar cantidades
    manejarActualizacionCantidad();
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
        <button id="vaciar-carrito" class="boton" aria-label="Vaciar todo el carrito de compras">
            Vaciar Carrito
        </button>
        `

    seccionCarrito.appendChild(resumen);

    // Agregar evento para vaciar carrito
    document.getElementById('vaciar-carrito').addEventListener('click', () => {
        vaciarCarrito();
        initCarrito();
    });
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
function manejarActualizacionCantidad() {
    document.querySelectorAll('.actualizar-cantidad').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const id = boton.getAttribute('data-id');
            const input = document.getElementById(`cantidad-${id}`);
            const nuevaCantidad = parseInt(input.value);
            
            if (nuevaCantidad < 1) {
                alert('La cantidad debe ser al menos 1');
                input.value = 1;
                return;
            }
            
          
            const stockDisponible = getProductStock(id);
            const cantidadEnCarrito = getProductCarrito(id)?.cantidad || 0;
            const maxPermitido = stockDisponible + cantidadEnCarrito;
            
            if (nuevaCantidad > maxPermitido) {
                alert(`No hay suficiente stock. Máximo disponible: ${maxPermitido}`);
                input.value = maxPermitido;
                return;
            }
            
            // Actualizar cantidad en carrito
            if (actualizarCantidadCarrito(id, nuevaCantidad)) {
                // Actualizar precio total en la vista
                const precioUnitario = parseFloat(boton.parentElement.querySelector('.precio-total').getAttribute('data-precio'));
                const precioTotal = precioUnitario * nuevaCantidad;
                boton.parentElement.querySelector('.precio-total').textContent = 
                    `P. total $${precioTotal.toLocaleString("es-AR")}`;
                
                // Recargar resumen
                initCarrito();
            }
        });
    });
}
