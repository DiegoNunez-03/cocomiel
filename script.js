// Número de WhatsApp de la confitería (reemplazá por el real)
const NUMERO_WHATSAPP = "5492915021177"; 
// Formato: 54 (código país) + 9 (si es celular) + código área + número, sin + ni espacios

// Botones rápidos (combos, botón principal)
const botonesWhatsApp = document.querySelectorAll(".btn-whatsapp");
botonesWhatsApp.forEach(boton => {
    boton.addEventListener("click", () => {
        const mensaje = boton.dataset.mensaje || "Hola, quiero hacer un pedido.";
        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    });
});

// Botón del formulario (mensaje libre)
const botonFormulario = document.querySelector(".btn-whatsapp-form");
const textareaMensaje = document.querySelector("#mensaje");

if (botonFormulario && textareaMensaje) {
    botonFormulario.addEventListener("click", () => {
        let mensaje = textareaMensaje.value.trim();

        if (!mensaje) {
            mensaje = "Hola, quiero hacer un pedido y tengo una consulta.";
        }

        const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    });
}

// Año dinámico en el footer
const spanAnio = document.getElementById("anio");
if (spanAnio) {
    spanAnio.textContent = new Date().getFullYear();
}

/* ========== CARRUSEL DE CATEGORÍAS (5 ítems, se ven 3) ========== */
/* ========== CARRUSEL DE CATEGORÍAS (5 ítems, se ven 3, loop infinito) ========== */

const track = document.getElementById("categorias-track");
const slides = track ? Array.from(track.querySelectorAll(".categoria-slide")) : [];
const btnPrev = document.getElementById("cat-arrow-left");
const btnNext = document.getElementById("cat-arrow-right");

const VISIBLE_SLIDES = 3;
let currentIndex = 0;

// máximo índice posible (ej: 5 - 3 = 2)
const maxIndex = slides.length > 0 ? Math.max(slides.length - VISIBLE_SLIDES, 0) : 0;

function actualizarCarrusel() {
    if (!track || slides.length === 0) return;

    const offsetPercent = (100 / VISIBLE_SLIDES) * currentIndex;
    track.style.transform = `translateX(-${offsetPercent}%)`;
}

if (btnPrev && btnNext && track && slides.length > 0) {
    btnPrev.addEventListener("click", () => {
        // si estamos al inicio y vamos para atrás → saltamos al final
        if (currentIndex <= 0) {
            currentIndex = maxIndex;
        } else {
            currentIndex -= 1;
        }
        actualizarCarrusel();
    });

    btnNext.addEventListener("click", () => {
        // si estamos al final y vamos para adelante → volvemos al inicio
        if (currentIndex >= maxIndex) {
            currentIndex = 0;
        } else {
            currentIndex += 1;
        }
        actualizarCarrusel();
    });

    // Estado inicial
    actualizarCarrusel();
}
