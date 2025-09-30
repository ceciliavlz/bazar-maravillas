import { cantidadCarrito } from "./carrito.js";
import { productos } from "./data.js";
import { getProductStock } from "./utils/stockUtils.js";

function tarjetaDestacado(p) {
  const articulo = document.createElement("div");
  articulo.className = "producto";
  articulo.innerHTML = `
  <img src=${p.img} alt=${p.nombre}>
        <div class="producto-detalles"> 
            <div>
                <h4 class="nombre-producto">${p.nombre}</h4>
            </div>
            <div>
                <p class="precio-producto"><strong>$${p.precio.toLocaleString("es-AR")}</strong></p>
            </div>
            <div>
                <p class="descripcion-producto">${p.descripcion}</p>
                <p class="stock-producto">${getProductStock(p.id)} en Stock</p>
            </div>
        </div>
        <button type="button" onclick="window.location.href='/pages/producto.html?id=${p.id}'">
                      Ver detalles</button>
`;
  return articulo;
} //TODO - Bart: Ask teacher if stock should automatically refresh between pages

function initIndex() {
  const cont = document.getElementById("productos");
  if (!cont) return;

  cont.innerHTML = "";
  for (let i=0; i<4; i++) {
    cont.appendChild(tarjetaDestacado(productos[i]));
  }
  cantidadCarrito();
}

document.addEventListener("DOMContentLoaded", initIndex);

window.addEventListener("storage", initIndex);