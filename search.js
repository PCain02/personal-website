document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchResultsContainer = document.createElement("div");
    searchResultsContainer.id = "search-results";
    searchInput.parentNode.appendChild(searchResultsContainer);

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        searchResultsContainer.innerHTML = ""; // Clear previous results
        if (query.trim() === "") return; // Ignore empty searches

        const elements = document.querySelectorAll("h1, h2, h3, p, li"); // Search in these elements
        let results = [];
        elements.forEach(element => {
            element.innerHTML = element.textContent; // Reset any previous highlights
            if (element.textContent.toLowerCase().includes(query)) {
                const regex = new RegExp(`(${query})`, "gi");
                element.innerHTML = element.textContent.replace(regex, `<mark>$1</mark>`); // Highlight matches
                results.push(element);
            }
        });

        // Display top 5 results
        results.slice(0, 5).forEach(result => {
            const resultItem = document.createElement("div");
            resultItem.className = "search-result-item";
            resultItem.innerHTML = result.innerHTML;
            searchResultsContainer.appendChild(resultItem);
        });
    }

    searchInput.addEventListener("input", performSearch); // Trigger search on input change

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            performSearch();
            // Redirect to search page with query
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        }
    });

    const filterButtons = document.querySelectorAll(".filter-button");
    const blogPosts = document.querySelectorAll(".blog-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            blogPosts.forEach(post => {
                if (topic === "all" || post.getAttribute("data-topic") === topic) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }
            });
        });
    });
});