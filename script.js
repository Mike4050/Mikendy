// Sélection des éléments du DOM
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
    let header = document.querySelector("header");
    let top = window.scrollY;

    sections.forEach((sec) => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                document.querySelector(`header nav a[href*="${id}"]`)?.classList.add("active");
            });
        }
    });

    // Activation du header sticky
    header.classList.toggle("sticky", top > 100);

    // Réinitialisation du menu burger au scroll
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

// Initialisation de ScrollReveal
ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal(".home-content, .heading, .about-content, .progress i, .progress span", { origin: "top" });
ScrollReveal().reveal(".about-img, .project-container", { origin: "bottom" });
ScrollReveal().reveal(".progress h3, .bar span", { origin: "left" });

// Animation Typed.js
const typed = new Typed(".text", {
    strings: ["Frontend Developer", "Backend Developer", "Fullstack Developer", "UI/UX Designer", "DevOps Engineer"],

    typeSpeed: 90,
    backSpeed: 100,
    backDelay: 1000,
    loop: true,
});

// Gestion du formulaire de contact
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const submitButton = document.querySelector(".btn");
    const successMessage = document.createElement("div");

    successMessage.style.display = "none";
    successMessage.style.color = "green";
    successMessage.style.marginTop = "10px";
    form.appendChild(successMessage);

    submitButton.addEventListener("click", (e) => {
        e.preventDefault();

        let allFilled = true;
        form.querySelectorAll("input, textarea").forEach((field) => {
            if (!field.value.trim()) {
                allFilled = false;
                field.style.border = "1px solid red";
            } else {
                field.style.border = "";
            }
        });

        if (allFilled) {
            successMessage.textContent = "Message envoyé avec succès !";
            successMessage.style.display = "block";

            form.reset();

            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
        }
    });
});

document.getElementById("downloadCV").addEventListener("click", function (event) {
    event.preventDefault(); // Empêche le comportement par défaut
    var link = document.createElement("a");
    link.href = "mike/Blue Modern Resume (1).pdf";
    link.setAttribute("download", "Blue Modern Resume (1).pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


// Fonction pour envoyer un email avec SMTP.js
function sendEmail() {
    let userEmail = document.getElementById("email").value;
    let userName = document.getElementById("name").value;
    let userMessage = document.getElementById("message").value;

    Email.send({
        Host: "smtp.gmail.com",
        Username: "mikendy861@gmail.com",
        Password: "password", // ⚠️ À remplacer par un mot de passe d'application sécurisé !
        To: "esternymikendy8@gmail.com",
        From: userEmail,
        Subject: "Nouveau message de contact",
        Body: `Name: ${userName}<br>Email: ${userEmail}<br>Message: ${userMessage}`,
    }).then((message) => alert(message));
}
