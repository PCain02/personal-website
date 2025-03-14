document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (query.trim() === "") return; // Ignore empty searches

        const elements = document.querySelectorAll("h1, h2, h3, p, li"); // Search in these elements
        elements.forEach(element => {
            element.innerHTML = element.textContent; // Reset any previous highlights
            if (element.textContent.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, "gi");
                element.innerHTML = element.textContent.replace(regex, `<mark>$1</mark>`); // Highlight matches
            }
        });
    }

    searchInput.addEventListener("input", performSearch); // Trigger search on input change

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            performSearch();
        }
    });
});