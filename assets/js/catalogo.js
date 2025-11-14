import { cantidadCarrito } from "./utils/cartUtils.js";
//import { productos } from "./data.js";
import { getProductos } from "../../api/api.js";
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

async function filtrarProductos(){
    const categoria = localStorage.getItem("filtro");
    const cont = document.getElementById("productos");
    cont.innerHTML = "";
    const productos = await getProductos();

    const filtrados = (categoria ? productos.filter((p)=> p.categoria === categoria) : productos);

    filtrados.forEach(p => {p.stock = cont.appendChild(cardProducto(p))});  
}

function actualizarFiltroPersistente() {
    const categoriaSeleccionada = document.getElementById("filtro-categoria").value;
    localStorage.setItem("filtro", categoriaSeleccionada);
}

function configurarLabelResponsivo() {
    const label = document.getElementById("label-categoria");
    if (!label) return;

    const mediaQuery = window.matchMedia("(max-width: 550px)");

    function actualizarLabel(e) {
        if (e.matches) {
            label.textContent = "Filtro";
        } else {
            label.textContent = "Filtrar por categoría:";
        }
    }

    actualizarLabel(mediaQuery);
    mediaQuery.addEventListener("change", actualizarLabel);
}

async function tipoFiltro(){
    const select = document.getElementById("filtro-categoria");
    const boton = document.getElementById("boton-filtrar");
    //quita duplicados
    select.replaceWith(select.cloneNode(true));
    boton.replaceWith(boton.cloneNode(true));

    const nuevoSelect = document.getElementById("filtro-categoria");
    const nuevoBoton = document.getElementById("boton-filtrar");

    const mediaQuery = window.matchMedia("(max-width: 550px)");

    if (mediaQuery.matches){
        nuevoSelect.addEventListener("change", () => {
            actualizarFiltroPersistente();
            filtrarProductos();
        });
    } else{
        nuevoBoton.addEventListener("click", () => {
            actualizarFiltroPersistente();
            filtrarProductos();
        });
    }

    mediaQuery.addEventListener("change", tipoFiltro);
}

async function initCatalogo() {
    const cont = document.getElementById("productos");
    if (!cont) return;
    cont.innerHTML = "";
    const productos = await getProductos();


    productos.forEach(p => cont.appendChild(cardProducto(p)));
    
    navPages();
    cantidadCarrito();
    menuHamburguesa();
    configurarLabelResponsivo();
    tipoFiltro();
}

document.addEventListener("DOMContentLoaded", initCatalogo);

window.addEventListener("storage", initCatalogo);
