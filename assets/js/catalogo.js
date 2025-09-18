import { productos } from "./data.js";
//cards productos
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
                <p class="stock-producto">${p.stock} en Stock</p>
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
}

//filtro por categoria
function filtrarProductos(){
    const categoria = document.getElementById("filtro-categoria").value;
    const cont = document.getElementById("productos");
    cont.innerHTML = "";

    const filtrados = categoria ? productos.filter((p)=> p.categoria === categoria): productos;
    //esto hace: categoria tiene un valor distinto a ""(vacio) ? 
    //              TRUE: retorna productos de la categoria, 
    //              FALSE: retorna todos los prod

    filtrados.forEach(p => cont.appendChild(cardProducto(p)));  

}

document.addEventListener("DOMContentLoaded", initCatalogo);

//evento apretar boton y filtrar
document.getElementById("boton-filtrar").addEventListener("click", filtrarProductos);


