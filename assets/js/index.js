import { productos } from "./data.js";

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
                <p class="stock-producto">${p.stock} en Stock</p>
            </div>
        </div>
        <button type="button" onclick="window.location.href='/pages/producto.html?id=${p.id}'">
                      Ver detalles</button>
`;
  return articulo;
}

function initIndex() {
  console.log("corre");
  const cont = document.getElementById("productos");
  if (!cont) return;

  cont.innerHTML = "";
  for (let i=0; i<4; i++) {
    console.log(i);
    cont.appendChild(tarjetaDestacado(productos[i]));
  }
}

document.addEventListener("DOMContentLoaded", initIndex);