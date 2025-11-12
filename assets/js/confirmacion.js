import { menuHamburguesa,navPages } from "./utils/pageUtils.js";
import { cantidadCarrito } from "./utils/cartUtils.js";
import { resumenHTML } from "./carrito.js";

const seccionConfirmacion = document.getElementById("seccion-confirmacion");

function Formulario(){
    
    seccionConfirmacion.innerHTML = `
        <div class="checkout-form-container">
        <h2>FINALIZAR COMPRA</h2>
        <form id="checkout-form" novalidate>
            <div class="form-group">
              <label for="nombre">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" required>
              <span class="error-msg"></span>
            </div>

            <div class="form-group">
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" name="email" required>
              <span class="error-msg"></span>
            </div>

            <div class="form-group">
              <label for="direccion">Dirección</label>
              <input type="text" id="direccion" name="direccion" required>
              <span class="error-msg"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="ciudad">Ciudad</label>
                <input type="text" id="ciudad" name="ciudad" required>
                <span class="error-msg"></span>
              </div>
              <div class="form-group">
                <label for="codigo-postal">Código postal</label>
                <input type="text" id="codigo-postal" name="codigo-postal" required>
                <span class="error-msg"></span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" required>
                <span class="error-msg"></span>
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
    const resumen = document.querySelector(".detalles-resumen");

    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
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
          mostrarError(nombre, "El nombre debe tener al menos 3 letras.");
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

        
        if (direccion.value.trim().length < 5) {
          mostrarError(direccion, "La dirección es obligatoria.");
          valido = false;
        } else {
          marcarValido(direccion);
        }

        
        if (ciudad.value.trim().length < 3) {
          mostrarError(ciudad, "La ciudad es obligatoria.");
          valido = false;
        } else {
          marcarValido(ciudad);
        }

        
        const regexTel = /^[0-9\s\-\+]{7,15}$/; 
        if (!regexTel.test(telefono.value.trim())) {
          mostrarError(telefono, "Ingresá un teléfono válido (mín. 7 dígitos).");
          valido = false;
        } else {
          marcarValido(telefono);
        }

        
        if (codigoPostal.value.trim().length < 3) {
          mostrarError(codigoPostal, "El código postal es obligatorio.");
          valido = false;
        } else {
          marcarValido(codigoPostal);
        }

        
        if (valido) {
          const mensaje = document.createElement('div');
          mensaje.className = "mensaje-confirmacion";
          resumen.setAttribute('aria-label', 'Mensaje confirmacion compra');

          const nombreVal = nombre.value; 
          const emailVal = email.value; 

          const idPedido = Math.floor(100000 + Math.random() * 900000);
          form.reset();

          mensaje.innerHTML = `
          <h3>¡Compra confirmada!</h3>
          <p>Gracias <strong>${nombreVal}</strong> por elegir <strong>Bazar Maravillas</strong>.</p>
          <p>La información de la compra fue enviada a <strong>${emailVal}</strong>.</p>
          <p><em>ID de pedido:</em> <strong>#${idPedido}</strong></p>
          <a href="../index.html" class="boton">Volver al inicio</a>
          `;
          seccionConfirmacion.appendChild(mensaje);

          form.style.display = "none";
          if (resumen) resumen.style.display = "none";
          document.querySelector(".checkout-form-container").style.display = "none";
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




function mostrarError(input, mensaje) {
  const formGroup = input.closest('.form-group');
  const errorSpan = formGroup.querySelector(".error-msg");
  if (errorSpan) {
    errorSpan.textContent = mensaje;
    errorSpan.style.display = "block";
  }
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

function marcarValido(input) {
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");

  const formGroup = input.closest('.form-group');
  const errorSpan = formGroup.querySelector(".error-msg");
  if (errorSpan) {
    errorSpan.textContent = "";
    errorSpan.style.display = "none";
  }
}

function limpiarErrores() {
  document.querySelectorAll(".error-msg").forEach((e) => {
    e.textContent = "";
    e.style.display = "none";
  });
  document.querySelectorAll("#checkout-form input, #checkout-form textarea").forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
}