document.addEventListener("DOMContentLoaded", function () {
    // Try to load the header from the first path
    fetch("../_includes/header.html")
        .then(response => {
            if (!response.ok) {
                // If the first path fails, try the second path
                return fetch("_includes/header.html");
            }
            return response;
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            // Create and append header.css dynamically
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../_includes/header.css"; // Default to the first path for CSS
            document.head.appendChild(link);
        })
        .catch(error => {
            console.error("Error loading header:", error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-bar input");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
});