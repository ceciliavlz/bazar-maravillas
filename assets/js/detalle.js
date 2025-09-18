import { productos } from "./data.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const p = productos.find((p) => p.id === parseInt(id));

function seccionProducto(){
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
                    <button id="boton-carrito" >AGREGAR AL CARRITO</button>
                </form>
            </div>
            <div class="descripcion-producto">
                <p>Descripcion: ${p.descripcion}</p>
                <p>Codigo: ${p.id}</p>
            </div>
        </div>`
}

function actualizarStock(e){    //e de evento
    e.preventDefault();
    
    const cantidad = document.getElementById('cantidad').value;

    productos.forEach((p, idx) => {

        if(p.id === +id) {
            console.log(p);
            productos[idx].stock -= cantidad

            seccionProducto()

            if(productos[idx].stock <= 0){
                document.getElementById("boton-carrito").disabled = true;
            }
        }

    })

}

document.addEventListener("DOMContentLoaded", seccionProducto());

document.addEventListener("submit", e => actualizarStock(e));