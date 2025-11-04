import { productos } from "../data.js";

export function getProductById(id){
    id = parseInt(id);
    const index = productos.findIndex(product => product.id === id);

    return productos[index];
}

function ajustarImgPath(pathFromPages) {
 if (window.location.pathname.includes("/pages")) {
  return pathFromPages;
 } else {
  return pathFromPages.replace("../", "");
 }
}

export function getProductos(){
    productos.forEach((p) => {
        p.img.alta = ajustarImgPath(p.img.alta);
        p.img.baja = ajustarImgPath(p.img.baja);
    });
    return productos;
}