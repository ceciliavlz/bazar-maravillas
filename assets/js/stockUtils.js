import { productos } from "./data.js";

export function getStock(id){
    id = +id;
    if (localStorage.getItem("arrayStock") === null) {
        crearArrayStock();
    }
    const arrayStock = JSON.parse(localStorage.getItem("arrayStock"));
    const productInStockArray = arrayStock[arrayStock.findIndex(product => product.id === +id)];
    return productInStockArray.stock;
}

export function crearArrayStock() {
    let arrayStock = [];
    for (let i=0; i<productos.length; i++) {
        let arrayStockItem = new Object();
        arrayStockItem.id = productos[i].id;
        arrayStockItem.stock = productos[i].stock;
        arrayStock.push(arrayStockItem);
    }
    localStorage.setItem("arrayStock", JSON.stringify(arrayStock));
}