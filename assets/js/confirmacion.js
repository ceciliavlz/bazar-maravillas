import { menuHamburguesa,navPages } from "./utils/pageUtils.js";
import { cantidadCarrito } from "./utils/cartUtils.js";
import { resumenHTML } from "./carrito.js";

const seccionConfirmacion = document.getElementById("seccion-confirmacion");

function Formulario(){
    seccionConfirmacion.innerHTML = `
        <div class="checkout-form-container">
        <h2>FINALIZAR COMPRA</h2>
        <form id="checkout-form">
            <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" required>
            </div>

            <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required>
            </div>

            <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion" required>
            </div>

            <div class="form-row">
            <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input type="text" id="ciudad" name="ciudad" required>
            </div>
            <div class="form-group">
                <label for="codigo-postal">Código postal</label>
                <input type="text" id="codigo-postal" name="codigo-postal" required>
            </div>
            </div>

            <div class="form-row">
            <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" required>
            </div>
            </div>

            <div class="form-group">
            <label for="notas">Notas adicionales (opcional)</label>
            <textarea id="notas" name="notas" rows="3"></textarea>
            </div>

            <button class="boton" id="boton-confirmar" type="submit">Confirmar pedido</button>
        </form>
        </div>
    `;
}

async function seccionConfirmacionHTML() {
    Formulario();
    Loading();

    const resumen = await resumenHTML();
    seccionConfirmacion.appendChild(resumen);
    
    const loader = document.querySelector('.loader-overlay');
    loader.style.display = 'none';
    
    mensajeConfirmacion();
}

function mensajeConfirmacion(){
    const form = document.getElementById("checkout-form");
    //const mensaje = document.getElementById("mensaje-confirmacion");
    const resumen = document.querySelector(".detalles-resumen");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const mensaje = document.createElement('div');
        mensaje.className = "mensaje-confirmacion";
        resumen.setAttribute('aria-label', 'Mensaje confirmacion compra');

        const nombre = document.getElementById("nombre").value;
        const email = document.getElementById("email").value;

        // Generar un ID de pedido aleatorio
        const idPedido = Math.floor(100000 + Math.random() * 900000);
        form.reset();

        mensaje.innerHTML = `
        <h3>¡Compra confirmada!</h3>
        <p>Gracias <strong>${nombre}</strong> por elegir <strong>Bazar Maravillas</strong>.</p>
        <p>La información de la compra fue enviada a <strong>${email}</strong>.</p>
        <p><em>ID de pedido:</em> <strong>#${idPedido}</strong></p>
        <a href="../index.html" class="boton">Volver al inicio</a>
        `;
        seccionConfirmacion.appendChild(mensaje);

        form.style.display = "none";
        if (resumen) resumen.style.display = "none";
        document.querySelector(".checkout-form-container").style.display = "none";
    });
}

function Loading(){
    const overlay = document.createElement("div");
    overlay.className = "loader-overlay";
    overlay.innerHTML = `
    <span class="loader"></span>
    <p>Preparando todo para tu pedido...</p>
    `;
    document.body.appendChild(overlay);
}

function initConfirmacion(){
    navPages();
    menuHamburguesa();
    cantidadCarrito();
    seccionConfirmacionHTML();
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("/pages/confirmacion")) {
        initConfirmacion();
    }
});

window.addEventListener("storage", (e) => {
    if (e.key === "arrayCarrito") {
        if (window.location.pathname.includes("/pages/confirmacion")) {
            initConfirmacion();
        }
    }
})