import { updateProductCarrito } from "./utils/cartUtils.js";
import { productos } from "./data.js";
import { getProductStock, updateProductStock, getProductInArrayStock } from "./utils/stockUtils.js";
import { cantidadCarrito } from "./carrito.js";
import { setPageDescription } from "./utils/pageUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const p = productos.find((p) => p.id === parseInt(id));
document.title = p.nombre.charAt(0) + p.nombre.slice(1).toLowerCase() + " - Bazar Maravillas";
const description = "Compra " + p.nombre + " en Bazar Maravillas";

setPageDescription(description);

function seccionProducto(){
    p.stock = getProductStock(id);

    const seccion = document.getElementById("detalle-producto");
    seccion.innerHTML = `
        <div class="imagen">
            <img src=${p.img} alt="${p.nombre}">
        </div>

        <div class="detalles">
            <div>
                <p class="${p.stock > 0 ? "hay-stock" : "sin-stock"} disponibilidad">${p.stock > 0 ? "HAY STOCK" : "SIN STOCK"}</p>
                <h4 class="nombre-producto">${p.nombre}</h4>
                <p class="stock-producto">${p.stock} en stock</p>
            </div>
            <div>
                <p class="precio-producto"><strong>$${p.precio.toLocaleString("es-AR")}</strong></p>

                <form id="agregar-carrito" action="input">
                    <input type="number" id="cantidad" value="1" min="1" max="${p.stock}"> 
                    <button id="boton-carrito">AGREGAR AL CARRITO</button>
                </form>
            </div>
            <div class="descripcion-producto">
                <p>Descripcion: ${p.descripcion}</p>
                <p>Codigo: ${p.id}</p>
            </div>
        </div>`
}

function actualizarStock(e){
    e.preventDefault();
    
    const cantidad = document.getElementById('cantidad').value;
    const producto = getProductInArrayStock(id);

    producto.stock -= cantidad;

    updateProductStock(producto.id, producto.stock);
    updateProductCarrito(producto.id, cantidad);
    seccionProducto();
    cantidadCarrito();
    
    if(producto.stock <= 0){
        document.getElementById("boton-carrito").disabled = true;
    }
}

function initDetalle(){
    seccionProducto();
    cantidadCarrito();
}

document.addEventListener("DOMContentLoaded", initDetalle);
document.addEventListener("submit", e => actualizarStock(e));