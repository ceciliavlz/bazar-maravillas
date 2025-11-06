import { getProductos } from "../../../api/api.js";

function getArrayStock() {
    if (localStorage.getItem("arrayStock") === null) {
        crearArrayStock();
    }
   const arrayStock = JSON.parse(localStorage.getItem("arrayStock"));

   return arrayStock;
}

export function getProductInArrayStock(id){
    id = parseInt(id);
    const arrayStock = getArrayStock();
    const index = arrayStock.findIndex(product => product.id === id);

    return arrayStock[index];
}

export function getProductStock(id){
    const product = getProductInArrayStock(id);
    return product.stock;
}

export function updateProductStock(id, stock){
    id = parseInt(id);

    const arrayStock = getArrayStock();
    const index = arrayStock.findIndex(product => product.id === id);
    arrayStock[index].stock = stock;
    localStorage.setItem("arrayStock", JSON.stringify(arrayStock));
}

export async function crearArrayStock() {
    const productos = await getProductos();
    let arrayStock = [];

    for (let producto of productos) {
        const { id, stock } = producto;
        arrayStock.push({id, stock})
    }
    localStorage.setItem("arrayStock", JSON.stringify(arrayStock));
}