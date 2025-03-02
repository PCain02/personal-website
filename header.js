document.addEventListener("DOMContentLoaded", function () {
    // Load header HTML
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            // Create and append header.css dynamically
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "header.css";
            document.head.appendChild(link);
        });
});

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector(".search-bar input");

    searchInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
});