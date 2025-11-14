const BASE_URL_FakeStoreAPI = "https://fakestoreapi.com";
const BASE_URL_BazarMaravilllasAPI = "https://api-bazar-maravillas.vercel.app";

const URL_API = BASE_URL_BazarMaravilllasAPI;

function adaptarDataAPI_FakeStore(dataAPI){
    return {
        id: dataAPI.id,
        nombre: dataAPI.title,
        descripcion: dataAPI.description,
        categoria: dataAPI.category,
        stock: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        precio: dataAPI.price,
        img: {
            alta: dataAPI.image,
            baja: dataAPI.image
        }
    }
}

export async function getCategorias(){
    const productos =  await getProductos();
    const categoria = new Set();

    productos.forEach(producto => {
        categoria.add(producto.categoria);
    });

    return [...categoria];
}

export async function getProductos(){
    const res = await fetch(`${URL_API}/products`)
    let data = await res.json();

    if (URL_API === BASE_URL_FakeStoreAPI){
        data = data.map(p => adaptarDataAPI_FakeStore(p));
    }

    return data;
}

export async function getProductById(id){
    const res = await fetch(`${URL_API}/products/${id}`);
    let data = await res.json();

    if (URL_API === BASE_URL_FakeStoreAPI){
        data = adaptarDataAPI_FakeStore(data);
    }

    return data;
}