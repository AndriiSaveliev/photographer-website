// Mobile menu toggle + simple form validation (client-side)

function toggleMenu() {
    const panel = document.getElementById("mobilePanel");
    const btn = document.getElementById("menuBtn");
    const isOpen = panel.style.display === "block";
    panel.style.display = isOpen ? "none" : "block";
    btn.setAttribute("aria-expanded", String(!isOpen));
}

function setCurrentYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
}

function validateContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    const nameErr = form.querySelector("#nameError");
    const emailErr = form.querySelector("#emailError");
    const msgErr = form.querySelector("#messageError");
    const notice = document.getElementById("formNotice");

    // Reset errors
    [nameErr, emailErr, msgErr].forEach(el => { if (el) el.textContent = ""; });
    if (notice) notice.hidden = true;

    let ok = true;

    if (!name.value.trim() || name.value.trim().length < 2) {
        nameErr.textContent = "Please enter your name (at least 2 characters).";
        ok = false;
    }

    const emailValue = email.value.trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    if (!emailValue || !emailValid) {
        emailErr.textContent = "Please enter a valid email address.";
        ok = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
        msgErr.textContent = "Please write a message (at least 10 characters).";
        ok = false;
    }

    if (!ok) return;

    // Demo success message (no backend)
    if (notice) {
        notice.hidden = false;
        notice.textContent = "Success! Your message is ready to be sent. (Demo form: no server connected.)";
    }

    form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
    setCurrentYear();

    const btn = document.getElementById("menuBtn");
    if (btn) btn.addEventListener("click", toggleMenu);

    const contactForm = document.getElementById("contactForm");
    if (contactForm) contactForm.addEventListener("submit", validateContactForm);
});