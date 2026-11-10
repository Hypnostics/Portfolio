

const pages = document.querySelectorAll(".page");
const navigationLinks = document.querySelectorAll("[data-page]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-navigation");

let currentPage = "home";



function changePage(pageName, addHistory = true) {

    const nextPage = document.getElementById(pageName);

   
    if (!nextPage || !nextPage.classList.contains("page")) {
        return;
    }

    
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

        
        mainNavigation.classList.remove("open");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

      
        if (addHistory) {
            history.pushState(
                { page: pageName },
                "",
                `#${pageName}`
            );
        }
    };


   

    if (document.startViewTransition) {

        document.startViewTransition(() => {
            updatePage();
        });

    } else {

        updatePage();

    }
}




navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const selectedPage = link.dataset.page;

        if (selectedPage) {
            changePage(selectedPage);
        }

    });

});




window.addEventListener("popstate", event => {

    const pageName =
        event.state?.page ||
        window.location.hash.replace("#", "") ||
        "home";

    changePage(pageName, false);

});




menuToggle.addEventListener("click", () => {

    mainNavigation.classList.toggle("open");

});




document.querySelectorAll('a[href="#contact"]').forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const aboutPage = document.getElementById("about");

        if (currentPage !== "about") {

            changePage("about");

           
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
