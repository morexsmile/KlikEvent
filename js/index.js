
"use strict";

/* =========================================================
   KLIKEVENT – MAIN JAVASCRIPT
   ========================================================= */


/* 1. DOM ELEMENTS
========================================================= */

const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mobileNavigation = document.querySelector("#mobile-navigation");

const eventSearchForm = document.querySelector("#eventSearchForm");
const searchQuery = document.querySelector("#searchQuery");
const searchLocation = document.querySelector("#searchLocation");

const newsletterForm = document.querySelector("#newsletterForm");


/* 2. MOBILE NAVIGATION
========================================================= */

function openMobileMenu() {
    if (!mobileMenuToggle || !mobileNavigation) return;

    mobileNavigation.hidden = false;
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    mobileMenuToggle.setAttribute("aria-label", "Zamknij menu");
    document.body.classList.add("menu-open");
}

function closeMobileMenu() {
    if (!mobileMenuToggle || !mobileNavigation) return;

    mobileNavigation.hidden = true;
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    mobileMenuToggle.setAttribute("aria-label", "Otwórz menu");
    document.body.classList.remove("menu-open");
}

function toggleMobileMenu() {
    const isExpanded =
        mobileMenuToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

if (mobileMenuToggle && mobileNavigation) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);

    mobileNavigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
        const clickedInsideMenu =
            mobileNavigation.contains(event.target);

        const clickedToggle =
            mobileMenuToggle.contains(event.target);

        if (
            mobileMenuToggle.getAttribute("aria-expanded") === "true" &&
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMobileMenu();
        }
    });
}


/* 3. EVENT SEARCH
========================================================= */

if (eventSearchForm) {
    eventSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchQuery.value.trim();
        const location = searchLocation.value.trim();

        if (!query && !location) {
            searchQuery.focus();
            showMessage(
                "Wpisz nazwę wydarzenia lub miasto, którego szukasz.",
                "error"
            );
            return;
        }

        const params = new URLSearchParams();

        if (query) {
            params.set("search", query);
        }

        if (location) {
            params.set("city", location);
        }

        window.location.href =
            `pages/events.html?${params.toString()}`;
    });
}


/* 4. NEWSLETTER
========================================================= */

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput =
            newsletterForm.querySelector('input[type="email"]');

        if (!emailInput) return;

        const email = emailInput.value.trim();

        if (!emailInput.checkValidity()) {
            emailInput.reportValidity();
            return;
        }

        showMessage(
            "Dziękujemy! Formularz demonstracyjny został poprawnie wypełniony.",
            "success"
        );

        newsletterForm.reset();
    });
}


/* 5. NOTIFICATION MESSAGE
========================================================= */

function showMessage(message, type = "success") {
    let notification = document.querySelector("#siteNotification");

    if (!notification) {
        notification = document.createElement("div");
        notification.id = "siteNotification";
        notification.className = "site-notification";

        notification.setAttribute("role", "status");
        notification.setAttribute("aria-live", "polite");

        document.body.appendChild(notification);
    }

    notification.textContent = message;
    notification.dataset.type = type;
    notification.classList.add("is-visible");

    if (notification.hideTimeout) {
        clearTimeout(notification.hideTimeout);
    }

    notification.hideTimeout = setTimeout(() => {
        notification.classList.remove("is-visible");
    }, 4500);
}


/* 6. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
    }
});


/* 7. RESPONSIVE MENU RESET
========================================================= */

window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
        closeMobileMenu();
    }
});


/* 8. FOOTER NEWSLETTER LINK
========================================================= */

const newsletterFooterLink = document.querySelector(
    '.footer-column a[href="#newsletter"]'
);

if (newsletterFooterLink) {
    newsletterFooterLink.addEventListener("click", () => {
        const newsletterSection =
            document.querySelector(".newsletter-section");

        if (newsletterSection) {
            newsletterSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    });
}


/* 9. INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    closeMobileMenu();

    console.log("KlikEvent – JavaScript initialized successfully.");
});
