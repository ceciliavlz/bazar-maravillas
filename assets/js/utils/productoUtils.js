import { productos } from "../data.js";

export function getProductById(id){
    id = parseInt(id);
    const index = productos.findIndex(product => product.id === id);

    return productos[index];
}