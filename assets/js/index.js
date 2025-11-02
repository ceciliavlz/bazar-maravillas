import { cantidadCarrito } from "./utils/cartUtils.js";
import { productos } from "./data.js";
import { getProductos } from "./utils/productoUtils.js";
import { getProductStock } from "./utils/stockUtils.js";
import { setPageKeywords } from "./utils/pageUtils.js";
import { menuHamburguesa } from "./utils/pageUtils.js";

const abrirHamburguesa = document.querySelector("#menu-hamburguesa");
const cerrarHamburguesa = document.querySelector("#cerrar-hamburguesa");

setPageKeywords();

function tarjetaDestacado(p) {
  const articulo = document.createElement("div");
  articulo.className = "producto";
  articulo.setAttribute("role", "group");
  articulo.setAttribute("aria-labelledby", `titulo-prod-${p.id}`);
  articulo.setAttribute("aria-describedby", `descripcion-prod-${p.id}`);
  articulo.innerHTML = `
  <img src=${p.img.baja.slice(3)} alt=${p.nombre}>
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
          onclick="window.location.href='pages/producto.html?id=${p.id}'">
          Ver detalles</button>
`;
  return articulo;
}

function initIndex() {
  const cont = document.getElementById("productos");
  if (!cont) return;

  const indexUsadosSet = new Set();

  while(indexUsadosSet.size < 4){
    let randomInt = Math.floor(Math.random() * getProductos().length);
    indexUsadosSet.add(randomInt);
  }

  const indexUsadosArray = [...indexUsadosSet];

  cont.innerHTML = "";
  for (let i=0; i<4; i++) {
    const index = indexUsadosArray[i];
    cont.appendChild(tarjetaDestacado(productos[index]));
  }

  cantidadCarrito();
  menuHamburguesa();
  
}

document.addEventListener("DOMContentLoaded", initIndex);

window.addEventListener("storage", initIndex);

abrirHamburguesa.addEventListener("click", () => {
  const nav = document.querySelector("#nav-list");
  nav.classList.add("visible");
})

cerrarHamburguesa.addEventListener("click", () => {
  const nav = document.querySelector("#nav-list");
  nav.classList.remove("visible");
})