document.addEventListener("DOMContentLoaded", function () {

    // 1. Kerakli HTML elementlarini olish
    const searchInput = document.getElementById("recipeSearch");
    const categoryButtons = document.querySelectorAll(".category-chip");
    const recipeCards = document.querySelectorAll(".recipe-card");
    const noResults = document.getElementById("noResults");

    let selectedCategory = "all";


    // 2. Qidiruv va kategoriya filtrini birgalikda ishlatish
    function filterRecipes() {

        const searchText = searchInput
            ? searchInput.value.trim().toLocaleLowerCase("uz-UZ")
            : "";

        let visibleCount = 0;

        recipeCards.forEach(function (card) {

            const title = (card.dataset.title || "")
                .toLocaleLowerCase("uz-UZ");

            const category = card.dataset.category || "";

            const matchesSearch = title.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }

        });

        // Hech qanday retsept topilmasa, xabar ko'rsatish
        if (noResults) {
            noResults.hidden = visibleCount > 0;
        }
    }


    // 3. Qidiruv maydoni
    if (searchInput) {
        searchInput.addEventListener("input", filterRecipes);
    }


    // 4. Kategoriya tugmalari
    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            selectedCategory = button.dataset.category || "all";

            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            filterRecipes();

            // Retseptlar bo'limiga yumshoq o'tish
            const recipesSection = document.getElementById("recipes");

            if (recipesSection) {
                recipesSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    // 5. Mobil menyu
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Menyuni yopish" : "Menyuni ochish"
            );

            menuToggle.textContent = isOpen ? "✕" : "☰";

        });

        // Menyudagi havola bosilganda menyuni yopish
        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Menyuni ochish");
                menuToggle.textContent = "☰";

            });

        });

    }


    // 6. Retseptni chop etish
    const printButton = document.getElementById("printRecipe");

    if (printButton) {

        printButton.addEventListener("click", function () {
            window.print();
        });

    }


    // 7. Joriy yilni ko'rsatish
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 8. Sahifa ochilganda filtrlashni tekshirish
    filterRecipes();

});