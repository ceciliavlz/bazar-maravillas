import { cantidadCarrito } from "./utils/cartUtils.js";
import { productos } from "./data.js";
import { getProductStock } from "./utils/stockUtils.js";
import { setPageKeywords } from "./utils/pageUtils.js";
import { menuHamburguesa, navPages } from "./utils/pageUtils.js";

setPageKeywords();

function cardProducto(p) {
  const articulo = document.createElement("div");
  articulo.className = "producto";
  articulo.setAttribute("role", "group");
  articulo.setAttribute("aria-labelledby", `titulo-prod-${p.id}`);
  articulo.setAttribute("aria-describedby", `descripcion-prod-${p.id}`);

  articulo.innerHTML = `
   <img src=${p.img.baja} alt=${p.nombre}>
        <div class="producto-detalles"> 
            <div>
                <h4 id="titulo-prod-${p.id}" class="nombre-producto">${p.nombre}</h4>
            </div>
            <div>
                <p class="precio-producto"><strong>$${p.precio.toLocaleString("es-AR")}</strong></p>
            </div>
            <div>
                <p id="descripcion-prod-${p.id}" class="descripcion-producto">${p.descripcion}</p>
                <p class="stock-producto">${getProductStock(p.id)} en Stock</p>
            </div>
        </div>
        <button type="button" class="boton" aria-label="Ver detalles de ${p.nombre}"
            onclick="window.location.href='producto.html?id=${p.id}'">
            Ver detalles
        </button>
  `;
  return articulo;
}

function initCatalogo() {
    const cont = document.getElementById("productos");
    if (!cont) return;
    cont.innerHTML = "";
    productos.forEach(p => cont.appendChild(cardProducto(p)));
    
    navPages();
    cantidadCarrito();
    menuHamburguesa();
}

function filtrarProductos(){
    const categoria = localStorage.getItem("filtro");
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    const filtrados = categoria ? productos.filter((p)=> p.categoria === categoria): productos;

    filtrados.forEach(p => {p.stock = cont.appendChild(cardProducto(p))});  

}

function actualizarFiltroPersistente() {
    const categoriaSeleccionada = document.getElementById("filtro-categoria").value;
    localStorage.setItem("filtro", categoriaSeleccionada);
}

document.addEventListener("DOMContentLoaded", initCatalogo);

window.addEventListener("storage", initCatalogo);

document.getElementById("boton-filtrar").addEventListener("click", filtrarProductos);

document.addEventListener("DOMContentLoaded", filtrarProductos)

document.getElementById("filtro-categoria").addEventListener("change", actualizarFiltroPersistente);
