// =========================================================
// PORTFOLIO JAVASCRIPT
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section[id]");


// =========================================================
// MOBILE MENU
// =========================================================

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    // =====================================================
    // CLOSE MENU AFTER CLICKING A LINK
    // =====================================================

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // =====================================================
    // CLOSE MENU WHEN CLICKING OUTSIDE
    // =====================================================

    document.addEventListener("click", event => {

        if (
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            navMenu.classList.remove("active");

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


// =========================================================
// NAVBAR SCROLL EFFECT
// =========================================================

if (navbar) {

    function updateNavbar() {

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();

}


// =========================================================
// ACTIVE NAVIGATION LINK
// =========================================================

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        const linkTarget = link.getAttribute("href");

        if (linkTarget === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);

updateActiveLink();


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements = document.querySelectorAll(
    ".section-container, .project-card, .skill-card, .learning-item"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    // Fallback for browsers without IntersectionObserver

    revealElements.forEach(element => {

        element.classList.add("show");

    });

}


// =========================================================
// ESCAPE KEY — CLOSE MOBILE MENU
// =========================================================

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }

});