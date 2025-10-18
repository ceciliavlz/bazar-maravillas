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
    })

    cerrar.addEventListener("click", () =>{
        nav.classList.add("menu-cerrado");
        setTimeout(() => {
        nav.classList.remove("visible");
        nav.classList.remove("menu-cerrado");
        }, 200);
    })
}
