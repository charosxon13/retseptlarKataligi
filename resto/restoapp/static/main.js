
document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-btn");

    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const activeButton = document.querySelector(
                ".category-btn.active"
            );

            if (activeButton) {
                activeButton.classList.remove("active");
            }

            this.classList.add("active");
        });
    });
});
