import { cantidadCarrito } from "./carrito.js";
import { productos } from "./data.js";
import { getProductStock } from "./utils/stockUtils.js";

function cardProducto(p) {
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
        <button type="button" onclick="window.location.href='producto.html?id=${p.id}'">
                      Ver detalles</button>
  `;
  return articulo;
}

function initCatalogo() {
  const cont = document.getElementById("productos");
  if (!cont) return;
  cont.innerHTML = "";
  productos.forEach(p => cont.appendChild(cardProducto(p)));
  cantidadCarrito();
}

function filtrarProductos(){
    const categoria = localStorage.getItem("filtro");
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    const filtrados = categoria ? productos.filter((p)=> p.categoria === categoria): productos;
    //esto hace: categoria tiene un valor distinto a ""(vacio) ? 
    //              TRUE: retorna productos de la categoria, 
    //              FALSE: retorna todos los prod

    filtrados.forEach(p => {p.stock = cont.appendChild(cardProducto(p))});  

}

//Guarda la última opción del filtro en localStorage
function actualizarFiltroPersistente() {
    const categoriaSeleccionada = document.getElementById("filtro-categoria").value;
    localStorage.setItem("filtro", categoriaSeleccionada);
}

document.addEventListener("DOMContentLoaded", initCatalogo);

window.addEventListener("storage", initCatalogo);

//evento apretar boton y filtrar
document.getElementById("boton-filtrar").addEventListener("click", filtrarProductos);

//Filtrar al cargarse la página
document.addEventListener("DOMContentLoaded", filtrarProductos)

//Filtrar elementos al cargar la página según LocalStorage
document.getElementById("filtro-categoria").addEventListener("change", actualizarFiltroPersistente);
