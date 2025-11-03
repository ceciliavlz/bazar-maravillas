//ids: deco-hogar 101+, articulos-cocina 201+, vajilla 301+, cama 401+, jardin 501+
export const productos = [    
  {
    id: 101,
    nombre: "MESA DE CENTRO DE MADERA",
    descripcion: "Diseño elegante y resistente.",
    categoria: "deco-hogar",
    stock: 8,
    precio: 250000,
    img: {
      alta: "../assets/img/mesa-madera.webp",
      baja: "../assets/img/mesa-madera_300x300.webp",
    }
  },
  {
    id: 102,
    nombre: "PLANTA IMITACION DE PLÁSTICO PEQUEÑA",
    descripcion: "No necesitan mantenimiento y brindan una sensación natural a su espacio.",
    categoria: "deco-hogar",
    stock: 30,
    precio: 4000,
    img: {
      alta: ajustarImgPath("../assets/img/planta.webp"),
      baja: ajustarImgPath("../assets/img/planta_300x300.webp"),
    }
  },
  {
    id: 103,
    nombre: "ORGANIZADOR DE PLÁSTICO MULTIUSO",
    descripcion: "Ordena tus espacios fácilmente.",
    categoria: "deco-hogar",
    stock: 20,
    precio: 4000,
    img: {
      alta: ajustarImgPath("../assets/img/organizador.webp"),
      baja: ajustarImgPath("../assets/img/organizador_300x300.webp"),
    }
  },
  {
    id: 104,
    nombre: "ACCESORIOS DECORATIVOS MINIMALISTAS",
    descripcion: "Estilo moderno para tu hogar.",
    categoria: "deco-hogar",
    stock: 12,
    precio: 9500,
    img: {
      alta: ajustarImgPath("../assets/img/decoracion-minimalista.webp"),
      baja: ajustarImgPath("../assets/img/decoracion-minimalista_300x300.webp"),
    }
  },
  {
    id: 105,
    nombre: "PLANIFICADOR SEMANAL MAGNÉTICO",
    descripcion: "Organiza tus tareas en la heladera. Incluye 6 marcadores adecuados.",
    categoria: "deco-hogar",
    stock: 20,
    precio: 10500,
    img: {
      alta: ajustarImgPath("../assets/img/planificador.webp"),
      baja: ajustarImgPath("../assets/img/planificador_300x300.webp"),
    }
  },
  {
    id: 106,
    nombre: "PERSIANAS ENROLLABLES BLACK-OUT",
    descripcion: "100% opacas de tela aislada térmica con protección ultravioleta, ideal para hogar y oficina.",
    categoria: "deco-hogar",
    stock: 10,
    precio: 100000,
    img: {
      alta: ajustarImgPath("../assets/img/persiana.webp"),
      baja: ajustarImgPath("../assets/img/persiana_300x300.webp"),
    }
  },
  {
    id: 201,
    nombre: "UTENSILIOS DE COCINA DE SILICONA",
    descripcion: "Resistentes al calor.",
    categoria: "articulos-cocina",
    stock: 30,
    precio: 20500,
    img: {
      alta: ajustarImgPath("../assets/img/utensilios.webp"),
      baja: ajustarImgPath("../assets/img/utensilios_300x300.webp"),
    }
  },
  {
    id: 202,
    nombre: "MATE DE ACERO CON BOMBILLA",
    descripcion: "Clásico y duradero.",
    categoria: "articulos-cocina",
    stock: 18,
    precio: 8000,
    img: {
      alta: ajustarImgPath("../assets/img/mate-acero.webp"),
      baja: ajustarImgPath("../assets/img/mate-acero_300x300.webp"),
    }
  },
  {
    id: 203,
    nombre: "OLLA ANTIADHERENTE 24CM",
    descripcion: "Perfecta para guisos y pastas.",
    categoria: "articulos-cocina",
    stock: 10,
    precio: 52000,
    img: {
      alta: ajustarImgPath("../assets/img/olla.webp"),
      baja: ajustarImgPath("../assets/img/olla_300x300.webp"),
    }
  },
  {
    id: 301,
    nombre: "JUEGO DE VAJILLA 12 PIEZAS",
    descripcion: "Ideal para reuniones familiares.",
    categoria: "vajilla",
    stock: 15,
    precio: 40000,
    img: {
      alta: ajustarImgPath("../assets/img/vajilla.webp"),
      baja: ajustarImgPath("../assets/img/vajilla_300x300.webp"),
    }
  },
  {
    id: 401,
    nombre: "JUEGO DE SÁBANAS 2 Y 1/2 PLAZAS",
    descripcion: "De diversos diseños y colores, máxima calidad.",
    categoria: "cama",
    stock: 20,
    precio: 45000,
    img: {
      alta: ajustarImgPath("../assets/img/sabana-gris.webp"),
      baja: ajustarImgPath("../assets/img/sabana-gris_300x300.webp"),
    }
  },
  {
    id: 402,
    nombre: "CUBRECAMA RÚSTICO",
    descripcion: "Añade un toque de elegancia rústica a tu dormitorio.",
    categoria: "cama",
    stock: 8,
    precio: 30000,
    img: {
      alta: ajustarImgPath("../assets/img/cubrecama.webp"),
      baja: ajustarImgPath("../assets/img/cubrecama_300x300.webp"),
    }
  },
  {
    id: 501,
    nombre: "JUEGO DE 5 PLANTAS ARTIFICIALES",
    descripcion: "Material de calidad de aspecto realista. Con macetas incluidas.",
    categoria: "jardin",
    stock: 10,
    precio: 15000,
    img: {
      alta: ajustarImgPath("../assets/img/5-plantas.webp"),
      baja: ajustarImgPath("../assets/img/5-plantas_300x300.webp"),
    }
  },
  {
    id: 502,
    nombre: "MACETA DE CEMENTO",
    descripcion: "Opción perfecta para realzar la belleza de tus plantas. Disponibles en distintas medidas.",
    categoria: "jardin",
    stock: 15,
    precio: 10000,
    img: {
      alta: ajustarImgPath("../assets/img/macetas.webp"),
      baja: ajustarImgPath("../assets/img/macetas_300x300.webp"),
    }
  }
];

function ajustarImgPath(pathFromPages) {
 if (window.location.pathname.includes("/pages")) {
  return pathFromPages;
 } else {
  return pathFromPages.slice(3);
 }
}