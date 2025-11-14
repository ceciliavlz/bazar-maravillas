import { menuHamburguesa,navPages } from "./utils/pageUtils.js";
import { cantidadCarrito, crearArrayCarrito } from "./utils/cartUtils.js";
import { resumenHTML } from "./carrito.js";

const seccionConfirmacion = document.getElementById("seccion-confirmacion");

function Formulario(){
    seccionConfirmacion.innerHTML = `
        <div class="checkout-form-container">
        <h2>FINALIZAR COMPRA</h2>
        <form id="checkout-form" novalidate>
            <div class="form-group">
            <label for="nombre">Nombre completo</label>
            <input type="text" id="nombre" name="nombre" 
                placeholder="Tu nombre" 
                minlength="3"
                maxlength="50"
                required>
            <span class="error"></span>
            </div>

            <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email"
                placeholder="nombre@ejemplo.com"
                required>
            <span class="error"></span>
            </div>

            <div class="form-group">
            <label for="direccion">Dirección</label>
            <input type="text" id="direccion" name="direccion"
                placeholder="Tu dirección" 
                minlength="3"
                maxlength="50" 
                required>
            <span class="error"></span>
            </div>

            <div class="form-row">
            <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input type="text" id="ciudad" name="ciudad"
                placeholder="Tu ciudad" 
                minlength="3"
                maxlength="50"
                required>
            <span class="error"></span>
            </div>

            <div class="form-group">
                <label for="codigo-postal">Código postal</label>
                <input type="text" id="codigo-postal" name="codigo-postal"
                placeholder="Código postal de la dirección" 
                minlength="4"
                maxlength="8"
                required>
            <span class="error"></span>
            </div>
            </div>

            <div class="form-row">
            <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono"
                placeholder="Tu número de teléfono" 
                minlength="6"
                maxlength="25" 
                required>
            <span class="error"></span>
            </div>
            </div>

            <div class="form-group">
            <label for="notas">Notas adicionales (opcional)</label>
            <textarea id="notas" name="notas"
                rows="3"
                placeholder="Información adicional sobre el lugar de envío"></textarea>
            <span class="error"></span>
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

        limpiarErrores();

        const nombre = document.getElementById("nombre");
        const email = document.getElementById("email");
        const direccion = document.getElementById("direccion");
        const ciudad = document.getElementById("ciudad");
        const codigoPostal = document.getElementById("codigo-postal");
        const telefono = document.getElementById("telefono");
    
        let valido = true;
    
        const regexNombre = /^[a-zA-ZÑñáÁéÉíÍóÓúÚ ]{3,50}$/;
        if (!regexNombre.test(nombre.value.trim())) {
          mostrarError(nombre, "El nombre debe tener al menos 3 letras y no contener números.");
          valido = false;
        } else {
          marcarValido(nombre);
        }
        
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regexEmail.test(email.value.trim())) {
          mostrarError(email, "Ingresá un correo válido.");
          valido = false;
        } else {
          marcarValido(email);
        }
        
        const regexDireccion = /^[a-zA-Z0-9ÑñáÁéÉíÍóÓúÚ/ ]{3,50}$/u;
        if (!regexDireccion.test(direccion.value.trim())) {
          mostrarError(direccion, "Ingresá una dirección válida. El único caracter especial permitido es /.");
          valido = false;
        } else {
          marcarValido(direccion);
        }
        
        if (!regexNombre.test(ciudad.value.trim())) {
          mostrarError(ciudad, "Ingresá una ciudad válida.");
          valido = false;
        } else {
          marcarValido(ciudad);
        }
        
        const regexCPViejo = /^[0-9]{4}$/;
        const regexCPNuevo = /^[A-Z0-9]{4,8}$/;
        if (!regexCPViejo.test(codigoPostal.value.trim()) && !regexCPNuevo.test(codigoPostal.value.trim())) {
          mostrarError(codigoPostal, "Ingresá un código postal válido. Las letras deben ir en mayúscula.");
          valido = false;
        } else {
          marcarValido(codigoPostal);
        }
        
        const regexTelefono = /^[0-9+ -]{6,25}$/;
        if (!regexTelefono.test(telefono.value.trim())) {
          mostrarError(telefono, "Ingresá un teléfono válido.");
          valido = false;
        } else {
          marcarValido(telefono);
        }

        if (valido) {
            limpiarClasesValidacion();
            const nombreCliente = nombre.value;
            const emailCliente = email.value;
            // Generar un ID de pedido aleatorio
            const idPedido = Math.floor(100000 + Math.random() * 900000);
            form.reset();

            mensaje.innerHTML = `
            <h3>¡Compra confirmada!</h3>
            <p>Gracias <strong>${nombreCliente}</strong> por elegir <strong>Bazar Maravillas</strong>.</p>
            <p>La información de la compra fue enviada a <strong>${emailCliente}</strong>.</p>
            <p><em>ID de pedido:</em> <strong>#${idPedido}</strong></p>
            <a href="../index.html" class="boton">Volver al inicio</a>
            `;
            seccionConfirmacion.appendChild(mensaje);

            form.style.display = "none";
            if (resumen) resumen.style.display = "none";
            document.querySelector(".checkout-form-container").style.display = "none";
            crearArrayCarrito();
        }
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


// TODO: cambiar is-valid e is-invalid por clases de CSS existentes
function mostrarError(input, mensaje) {
  const errorSpan = input.parentElement.querySelector(".error");
  if (errorSpan) {
    errorSpan.textContent = mensaje;
    errorSpan.style.display = "block";
  }
  input.classList.remove("esValido");
  input.classList.add("esInvalido");
}

function marcarValido(input) {
  input.classList.remove("esInvalido");
  input.classList.add("esValido");
}

function limpiarErrores() {
  document.querySelectorAll(".error").forEach((e) => (e.style.display = "none"));
}

function limpiarClasesValidacion() {
  document.querySelectorAll("input").forEach((input) => {
    input.classList.remove("esValido", "esInvalido");
  });
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
});