import { menuHamburguesa,navPages } from "./utils/pageUtils.js";

function initContacto() {
  navPages();
  menuHamburguesa();

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    limpiarErrores();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    let valido = true;

    const regexNombre = /^[a-zA-ZÑñáÁéÉíÍóÓúÚ ]{3,50}$/;
    if (!regexNombre.test(nombre.value.trim())) {
      mostrarError(nombre, "El nombre debe tener al menos 3 letras y no contener números.");
      valido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value.trim())) {
      mostrarError(email, "Ingresá un correo válido.");
      valido = false;
    }

    if (mensaje.value.trim().length < 10) {
      mostrarError(mensaje, "El mensaje debe tener al menos 10 caracteres.");
      valido = false;
    }

    if (valido) {
      mostrarMensajeExito();
      form.reset();
    }
    
  });
}

function mostrarError(input, mensaje) {
  const errorSpan = input.parentElement.querySelector(".error");
  if (errorSpan) {
    errorSpan.textContent = mensaje;
    errorSpan.style.display = "block";
  }
  input.classList.add("input-error");
}

function limpiarErrores() {
  document.querySelectorAll(".error").forEach((e) => (e.style.display = "none"));
  document.querySelectorAll(".input-error").forEach((i) => i.classList.remove("input-error"));
}

function mostrarMensajeExito() {
  const form = document.getElementById("contactForm");
  const successMsg = document.createElement("p");
  successMsg.className = "mensaje-exito";
  successMsg.textContent = "Tu mensaje fue enviado con éxito. ¡Gracias por contactarte!";
  form.parentElement.insertBefore(successMsg, form.nextSibling);

  setTimeout(() => successMsg.remove(), 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("/pages/contacto")) {
    initContacto();
  }
});
