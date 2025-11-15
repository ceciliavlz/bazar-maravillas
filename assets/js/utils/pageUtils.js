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

export function menuHamburguesa(){
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#menu-hamburguesa");
    const cerrar = document.querySelector("#cerrar-hamburguesa");
    
    abrir.addEventListener("click", () =>{
        nav.classList.add("visible");
        
        const background = document.createElement('div');
        background.addEventListener('click', () => {
            cerrarMenu();
        })
        
        background.id = 'background-menu';
        background.style.width = '100vw';
        background.style.height = '100vh';
        background.style.background = 'black';
        background.style.position = 'absolute';
        background.style.top = 0;
        background.style.opacity = 0.2;

        document.querySelector('header').appendChild(background)
    })

    function cerrarMenu(){
        const background = document.getElementById('background-menu');

        nav.classList.add("menu-cerrado");

        setTimeout(() => {
            nav.classList.remove("visible");
            nav.classList.remove("menu-cerrado");
            background.remove();

        }, 200);
    }

    cerrar.addEventListener("click", () =>{
        cerrarMenu();
    })
}

export function navPages() {
    let header = document.getElementById("header");
    header.innerHTML = `
    <button id="menu-hamburguesa" aria-label="expanded" aria-expanded="false">
            <i class="bi bi-list"></i>
    </button>
    <a href="../index.html"" aria-label="Ir al inicio">
            <img src="../assets/img/logo-desktop.png" alt="Bazar Maravillas Logo" class="logo-desktop">
    </a>
    <nav role="navigation" class="nav" id="nav" aria-label="Menú principal">
        <button id="cerrar-hamburguesa" aria-label="expanded" aria-expanded="false">
            <i class="bi bi-x-lg"></i>
        </button>
        <ul class="nav-list">
            <li class="nav-link"><a href="../index.html">
                <i class="bi bi-house"></i>INICIO</a>
            </li>
            <li class="nav-link"><a href="../index.html#section-destacados">
                <i class="bi bi-star"></i>DESTACADOS</a>
            </li>
            <li class="nav-link"><a href="products.html">
                <i class="bi bi-bag"></i>PRODUCTOS</a>
            </li>
            <li class="nav-link"><a href="contacto.html">
                <i class="bi bi-telephone-inbound"></i>CONTACTO</a>
            </li>
        </ul>
    </nav>
    <a href="./carrito.html" class="cart-icon linkCarrito" aria-label="Ver carrito">
        <i class="bi bi-cart"></i><span id="contador-carrito" aria-live="polite">0</span>
    </a>
    `
}

export function StartLoading() {
  if (document.querySelector('.loader-overlay')) return;

  const overlay = document.createElement('div');
  overlay.className = 'loader-overlay';
  overlay.innerHTML = `
    <span class="loader"></span>
    <p>Preparando todo para tu pedido...</p>
  `;

  document.body.appendChild(overlay);
}

export function StopLoading() {
    setInterval(() => {
        const loader = document.querySelector('.loader-overlay');
        if (loader) loader.remove()
    }, 1000);
}