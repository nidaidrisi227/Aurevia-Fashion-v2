/* =========================================================
   AUREVIA
   Main JavaScript
   Vanilla JavaScript only
   ========================================================= */

"use strict";


/* =========================================================
   01. DOM ELEMENTS
   ========================================================= */

const body = document.body;

const pageLoader = document.getElementById("pageLoader");

const siteHeader = document.getElementById("siteHeader");

const menuToggle = document.getElementById("menuToggle");
const mobileNavigation = document.getElementById("mobileNavigation");

const searchButton = document.getElementById("searchButton");
const searchModal = document.getElementById("searchModal");
const closeSearch = document.getElementById("closeSearch");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");

const bagButton = document.getElementById("bagButton");
const bagCountElement = document.getElementById("bagCount");

const productModal = document.getElementById("productModal");
const closeProduct = document.getElementById("closeProduct");

const modalProductImage = document.getElementById("modalProductImage");
const modalProductName = document.getElementById("modalProductName");
const modalProductCategory = document.getElementById("modalProductCategory");
const modalProductPrice = document.getElementById("modalProductPrice");

const addToBagButton = document.getElementById("addToBagButton");
const modalBagMessage = document.getElementById("modalBagMessage");

const bagToast = document.getElementById("bagToast");
const toastText = document.getElementById("toastText");

const backToTop = document.getElementById("backToTop");

const newsletterForm = document.getElementById("newsletterForm");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

const footerNewsletterLink = document.getElementById(
    "footerNewsletterLink"
);


/* =========================================================
   02. STATE
   ========================================================= */

let bagCount = 0;
let currentProduct = null;
let toastTimeout = null;


/* =========================================================
   03. PAGE LOADER
   ========================================================= */

window.addEventListener("load", () => {

    window.setTimeout(() => {

        pageLoader.classList.add("loaded");

        initializeRevealAnimations();

    }, 450);

});


/* =========================================================
   04. MOBILE NAVIGATION
   ========================================================= */

function openMobileMenu() {

    menuToggle.classList.add("open");

    mobileNavigation.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    body.classList.add("no-scroll");
}


function closeMobileMenu() {

    menuToggle.classList.remove("open");

    mobileNavigation.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    body.classList.remove("no-scroll");
}


function toggleMobileMenu() {

    const isOpen = mobileNavigation.classList.contains("open");

    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


menuToggle.addEventListener("click", toggleMobileMenu);


/* Close mobile menu after clicking a navigation link */

const mobileNavLinks = document.querySelectorAll(
    ".mobile-nav-link"
);

mobileNavLinks.forEach((link) => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* =========================================================
   05. NAVBAR SCROLL EFFECT
   ========================================================= */

function updateHeader() {

    if (window.scrollY > 40) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================================
   06. ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const desktopNavLinks = document.querySelectorAll(
    ".desktop-navigation .nav-link"
);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + window.innerHeight * 0.35;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            currentSection = section.id;

        }

    });


    desktopNavLinks.forEach((link) => {

        const linkTarget = link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkTarget === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================================
   07. SEARCH MODAL
   ========================================================= */

function openSearchModal() {

    searchModal.classList.add("open");

    searchModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("no-scroll");

    searchMessage.textContent = "";

    window.setTimeout(() => {

        searchInput.focus();

    }, 250);

}


function closeSearchModal() {

    searchModal.classList.remove("open");

    searchModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove("no-scroll");

}


searchButton.addEventListener(
    "click",
    openSearchModal
);


closeSearch.addEventListener(
    "click",
    closeSearchModal
);


/* Close search by clicking outside */

searchModal.addEventListener("click", (event) => {

    if (event.target === searchModal) {

        closeSearchModal();

    }

});


/* Search form */

searchForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const query = searchInput.value.trim();

    if (!query) {

        searchMessage.textContent =
            "Please enter something to search.";

        searchInput.focus();

        return;

    }

    searchMessage.textContent =
        `Showing a curated search preview for “${query}”.`;

});


/* =========================================================
   08. PRODUCT DATA
   ========================================================= */

const productData = {

    "Solenne Silk Dress": {
        category: "Silk / Evening",
        price: "$485",
        image:
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85"
    },

    "Aurelia Structured Coat": {
        category: "Wool / Outerwear",
        price: "$690",
        image:
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85"
    },

    "Nocturne Tailored Set": {
        category: "Wool Blend / Tailoring",
        price: "$575",
        image:
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85"
    },

    "Sera Draped Blouse": {
        category: "Viscose / Tops",
        price: "$265",
        image:
            "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85"
    }

};


/* =========================================================
   09. PRODUCT MODAL
   ========================================================= */

const productButtons = document.querySelectorAll(
    ".product-view"
);


function openProductModal(productName) {

    const product = productData[productName];

    if (!product) {
        return;
    }

    currentProduct = productName;

    modalProductName.textContent = productName;

    modalProductCategory.textContent = product.category;

    modalProductPrice.textContent = product.price;

    modalProductImage.src = product.image;

    modalProductImage.alt = productName;

    modalBagMessage.textContent = "";

    productModal.classList.add("open");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    body.classList.add("no-scroll");

}


productButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const card = event.target.closest(".product-card");

        if (!card) {
            return;
        }

        const productName =
            card.dataset.product;

        openProductModal(productName);

    });

});


function closeProductModal() {

    productModal.classList.remove("open");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );

    body.classList.remove("no-scroll");

    currentProduct = null;

}


closeProduct.addEventListener(
    "click",
    closeProductModal
);


productModal.addEventListener("click", (event) => {

    if (event.target === productModal) {

        closeProductModal();

    }

});


/* =========================================================
   10. SHOPPING BAG
   ========================================================= */

function updateBagCount() {

    bagCountElement.textContent = bagCount;

}


function showToast(message) {

    toastText.textContent = message;

    bagToast.classList.add("show");

    if (toastTimeout) {

        window.clearTimeout(toastTimeout);

    }

    toastTimeout = window.setTimeout(() => {

        bagToast.classList.remove("show");

    }, 3000);

}


function addCurrentProductToBag() {

    if (!currentProduct) {
        return;
    }

    bagCount += 1;

    updateBagCount();

    modalBagMessage.textContent =
        `${currentProduct} has been added to your bag.`;

    showToast(
        `${currentProduct} added to your bag.`
    );

}


addToBagButton.addEventListener(
    "click",
    addCurrentProductToBag
);


/* Bag button */

bagButton.addEventListener("click", () => {

    if (bagCount === 0) {

        showToast(
            "Your bag is currently empty."
        );

        return;

    }

    showToast(
        `Your bag contains ${bagCount} ${
            bagCount === 1 ? "piece" : "pieces"
        }.`
    );

});


/* =========================================================
   11. NEWSLETTER VALIDATION
   ========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    return emailPattern.test(email);

}


newsletterForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const email =
            emailInput.value.trim();

        formMessage.className =
            "form-message";

        if (!email) {

            formMessage.textContent =
                "Please enter your email address.";

            formMessage.classList.add("error");

            emailInput.focus();

            return;

        }

        if (!isValidEmail(email)) {

            formMessage.textContent =
                "Please enter a valid email address.";

            formMessage.classList.add("error");

            emailInput.focus();

            return;

        }

        formMessage.textContent =
            "Thank you. You are now part of the AUREVIA letter.";

        formMessage.classList.add("success");

        newsletterForm.reset();

    }
);


/* =========================================================
   12. FOOTER NEWSLETTER LINK
   ========================================================= */

if (footerNewsletterLink) {

    footerNewsletterLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            const newsletter =
                document.querySelector(".newsletter");

            if (!newsletter) {
                return;
            }

            newsletter.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            window.setTimeout(() => {

                emailInput.focus();

            }, 700);

        }
    );

}


/* =========================================================
   13. SCROLL REVEAL
   ========================================================= */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

        return;

    }


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   14. BACK TO TOP
   ========================================================= */

function updateBackToTop() {

    if (window.scrollY > 700) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   15. KEYBOARD CONTROLS
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    if (mobileNavigation.classList.contains("open")) {

        closeMobileMenu();

    }

    if (searchModal.classList.contains("open")) {

        closeSearchModal();

    }

    if (productModal.classList.contains("open")) {

        closeProductModal();

    }

});


/* =========================================================
   16. IMAGE ERROR HANDLING
   ========================================================= */

const allImages =
    document.querySelectorAll("img");


allImages.forEach((image) => {

    image.addEventListener("error", () => {

        image.style.backgroundColor =
            "#ddd4c5";

        image.alt =
            "AUREVIA editorial image";

    });

});


/* =========================================================
   17. INITIALIZATION
   ========================================================= */

updateBagCount();
updateHeader();
updateActiveNavigation();
updateBackToTop();