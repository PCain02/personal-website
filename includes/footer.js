document.addEventListener("DOMContentLoaded", function () {
    // Try to load the footer from the first path
    fetch("../includes/footer.html")
        .then(response => {
            if (!response.ok) {
                // If the first path fails, try the second path
                return fetch("includes/footer.html");
            }
            return response;
        })
        .then(response => response.text())
        .then(data => {
            document.getElementById("site-footer").innerHTML = data;
            // Create and append footer.css dynamically
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../includes/footer.css"; // Default to the first path for CSS
            document.head.appendChild(link);
        })
        .catch(error => {
            console.error("Error loading footer:", error);
        });
});