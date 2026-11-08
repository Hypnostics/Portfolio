
/* =========================================
   NOMAD — NAVIGATION ENGINE
========================================= */

const pages = document.querySelectorAll(".page");
const navigationLinks = document.querySelectorAll("[data-page]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-navigation");

let currentPage = "home";


/* -----------------------------------------
   CHANGE PAGE
----------------------------------------- */

function changePage(pageName, addHistory = true) {

    const nextPage = document.getElementById(pageName);

    // Make sure the requested page exists.
    if (!nextPage || !nextPage.classList.contains("page")) {
        return;
    }

    // Avoid unnecessary transitions.
    if (pageName === currentPage) {
        return;
    }

    const updatePage = () => {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        nextPage.classList.add("active");

        navigationLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === pageName &&
                link.classList.contains("nav-link")
            );

        });

        currentPage = pageName;

        // Close the mobile navigation.
        mainNavigation.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        // Keep the browser URL synchronized.
        if (addHistory) {
            history.pushState(
                { page: pageName },
                "",
                `#${pageName}`
            );
        }
    };


    // Use the native View Transitions API where supported.
    // This creates a smooth visual transition between pages.

    if (document.startViewTransition) {

        document.startViewTransition(() => {
            updatePage();
        });

    } else {

        updatePage();

    }
}


/* -----------------------------------------
   NAVIGATION CLICK EVENTS
----------------------------------------- */

navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const selectedPage = link.dataset.page;

        if (selectedPage) {
            changePage(selectedPage);
        }

    });

});


/* -----------------------------------------
   BROWSER BACK / FORWARD BUTTONS
----------------------------------------- */

window.addEventListener("popstate", event => {

    const pageName =
        event.state?.page ||
        window.location.hash.replace("#", "") ||
        "home";

    changePage(pageName, false);

});


/* -----------------------------------------
   MOBILE NAVIGATION
----------------------------------------- */

menuToggle.addEventListener("click", () => {

    mainNavigation.classList.toggle("open");

});


/* -----------------------------------------
   CONTACT SECTION
----------------------------------------- */

document.querySelectorAll('a[href="#contact"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const aboutPage = document.getElementById("about");

        if (currentPage !== "about") {

            changePage("about");

            // Wait until the page is rendered before scrolling.
            setTimeout(() => {

                const contactSection =
                    aboutPage.querySelector("#contact");

                contactSection?.scrollIntoView({
                    behavior: "smooth"
                });

            }, 700);

        } else {

            aboutPage.querySelector("#contact")?.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* -----------------------------------------
   INITIAL PAGE FROM URL
----------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    const requestedPage =
        window.location.hash.replace("#", "");

    if (
        requestedPage &&
        document.getElementById(requestedPage)?.classList.contains("page")
    ) {

        pages.forEach(page => {
            page.classList.remove("active");
        });

        document.getElementById(requestedPage).classList.add("active");

        currentPage = requestedPage;

        navigationLinks.forEach(link => {

            link.classList.toggle(
                "active",
                link.dataset.page === requestedPage &&
                link.classList.contains("nav-link")
            );

        });

    }

});
