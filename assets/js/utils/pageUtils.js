export function setPageDescription(description) {
    const pageDescription = document.querySelector('meta[name="description"]');
    if (pageDescription) {
        pageDescription.setAttribute("content", description);
    } else {
        const newDescription = document.createElement("meta");
        newDescription.name = "description";
        newDescription.content = description;
        document.head.appendChild(newDescription);
    }
}

export function setPageKeywords() {
    const keywords = "comprar, bazar, hogar, deco, decoracion";
    const pageKeywords = document.querySelector('meta[name="keywords"]');
    if (pageKeywords) {
        pageKeywords.setAttribute("content", keywords);
    } else {
        const newKeywords = document.createElement("meta");
        newKeywords.name = "keywords";
        newKeywords.content = keywords;
        document.head.appendChild(newKeywords);
    }
}

export function navPages() {
    let nav = document.getElementById("nav");
    nav.innerHTML = `
    <ul id="nav-list" class="nav-list">
        <button id="cerrar-hamburguesa" aria-label="expanded" aria-expanded="false">X</button>
        <li class="nav-link"><a href="../index.html">INICIO</a></li>
        <li class="nav-link"><a href="../index.html#section-destacados">DESTACADOS</a></li>
        <li class="nav-link"><a href="products.html">PRODUCTOS</a></li>
        <li class="nav-link"><a href="">CONTACTO</a></li>
    </ul>

    <a href="./carrito.html" class="cart-icon linkCarrito" aria-label="Ver carrito">
        🛒
        <span id="contador-carrito">0</span>
    </a>
    
    <button id="menu-hamburguesa" aria-label="expanded" aria-expanded="false">
        <img src="../assets/img/hamburger-icon.png" alt="Menú" height="35rem" width="35rem"/>
    </button>
    `
}