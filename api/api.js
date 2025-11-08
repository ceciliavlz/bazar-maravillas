const BASE_URL_FakeStoreAPI = "https://fakestoreapi.com";
const BASE_URL_FakeStorePlatzi = "https://api.escuelajs.co/api/v1"; //Hay que cambiar las categorias en el select de products.html

const URL_API = BASE_URL_FakeStoreAPI;

function adaptarDataAPI_Platzi(dataAPI){
    return {
        id: dataAPI.id,
        nombre: dataAPI.title,
        descripcion: dataAPI.description,
        categoria: dataAPI.category.name,
        stock: Math.floor(Math.random() * (100 - 5 + 1)) + 5,
        precio: dataAPI.price,
        img: {
            alta: dataAPI.images[0],
            baja: dataAPI.images[0]
        }
    }
}

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

function comparaCategoria(p){
    return(p.category.name === 'Miscellaneous' || p.category.name === 'Electronics' || p.category.name === 'Furniture');
}

function filtroNombre(p){
    let titulo = p.title.split(" ");
    return (titulo.length > 1);
}

export async function getProductos(){
    const res = await fetch(`${URL_API}/products`)
    let data = await res.json();

    URL_API === BASE_URL_FakeStorePlatzi
        ? data =  data.filter(p => comparaCategoria(p) && filtroNombre(p)).map(p => adaptarDataAPI_Platzi(p))
        : data = data.map(p => adaptarDataAPI_FakeStore(p));

    return data;
}

export async function getProductById(id){
    const res = await fetch(`${URL_API}/products/${id}`);
    let data = await res.json();

    URL_API === BASE_URL_FakeStorePlatzi
        ? data = adaptarDataAPI_Platzi(data)
        : data = adaptarDataAPI_FakeStore(data);
    
    return data;
}