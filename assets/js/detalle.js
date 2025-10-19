import { updateProductCarrito, cantidadCarrito } from "./utils/cartUtils.js";
import { productos } from "./data.js";
import { getProductStock, updateProductStock, getProductInArrayStock } from "./utils/stockUtils.js";
import { setPageDescription, setPageKeywords } from "./utils/pageUtils.js";
import { menuHamburguesa,navPages } from "./utils/pageUtils.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const p = productos.find((p) => p.id === parseInt(id));
document.title = p.nombre.charAt(0) + p.nombre.slice(1).toLowerCase() + " - Bazar Maravillas";
const description = "Compra " + p.nombre + " en Bazar Maravillas";

setPageKeywords();
setPageDescription(description);

function seccionProducto(){
    p.stock = getProductStock(id);

    const seccion = document.getElementById("detalle-producto");
    seccion.innerHTML = `
        <div class="imagen">
            <img src=${p.img.alta} alt="Imagen de ${p.nombre}">
        </div>

        <div class="detalles">
            <div>
                <p class="${p.stock > 0 ? "hay-stock" : "sin-stock"} disponibilidad" aria-live="polite">${p.stock > 0 ? "HAY STOCK" : "SIN STOCK"}</p>
                <h4 class="nombre-producto">${p.nombre}</h4>
                <p class="stock-producto">${p.stock} en stock</p>
            </div>
            <div>
                <p class="precio-producto"><strong>$${p.precio.toLocaleString("es-AR")}</strong></p>

                <form id="agregar-carrito" aria-label="Formulario para agregar al carrito" action="input">
                    <input
                        type="number"
                        id="cantidad"
                        value="1"
                        min="1"
                        max="${p.stock}"
                        aria-describedby="stock-info-${p.id}"> 
                    <button id="boton-carrito" class="boton">AGREGAR AL CARRITO</button>
                </form>
            </div>
            <div class="descripcion-producto" aria-label="Descripción del producto">
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
    navPages();
    seccionProducto();
    cantidadCarrito();
    menuHamburguesa();
}

document.addEventListener("DOMContentLoaded", initDetalle);
document.addEventListener("submit", e => actualizarStock(e));