document.addEventListener("DOMContentLoaded", function () {
    // --- Search Functionality ---
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResultsContainer = document.getElementById("search-results");

    function performSearch() {
        const query = searchInput?.value.trim().toLowerCase();
        if (!searchResultsContainer || !query) return;

        searchResultsContainer.innerHTML = ""; // Clear previous results

        if (query === "") {
            searchResultsContainer.innerHTML = "<p>Please enter a search query.</p>";
            return;
        }

        const elements = document.querySelectorAll("h1, h2, h3, p, li");
        let results = [];

        elements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(query)) {
                const regex = new RegExp(`(${query})`, "gi");
                const highlightedText = element.textContent.replace(regex, `<mark>$1</mark>`);
                results.push(`<div class="search-result-item">${highlightedText}</div>`);
            }
        });

        if (results.length > 0) {
            searchResultsContainer.innerHTML = results.join("");
        } else {
            searchResultsContainer.innerHTML = "<p>No results found.</p>";
        }

        // Update the search results page URL
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    function redirectToSearchPage() {
        const query = searchInput?.value.trim();
        if (query !== "") {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }

    searchButton?.addEventListener("click", () => {
        if (searchResultsContainer) {
            performSearch();
        } else {
            redirectToSearchPage();
        }
    });

    searchInput?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            if (searchResultsContainer) {
                performSearch();
            } else {
                redirectToSearchPage();
            }
        }
    });

    // --- Filter Functionality for Blog and Project Posts ---
    const filterButtons = document.querySelectorAll(".filter-button");

    const applyFilter = (postsSelector) => {
        const posts = document.querySelectorAll(postsSelector);
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                const topic = button.getAttribute("data-topic");
                posts.forEach(post => {
                    const postTopics = post.getAttribute("data-topic").split(" ");
                    if (topic === "all" || postTopics.includes(topic)) {
                        post.classList.remove("hidden");
                    } else {
                        post.classList.add("hidden");
                    }
                });
            });
        });
    };

    applyFilter(".blog-post");
    applyFilter(".project-post");

    // --- Sorting Functionality ---
    const sortByDropdown = document.getElementById("sort-by");

    const sortPosts = (containerSelector, postSelector, order) => {
        const container = document.querySelector(containerSelector);
        const posts = Array.from(document.querySelectorAll(postSelector));

        const sortedPosts = posts.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));
            return order === "newest" ? dateB - dateA : dateA - dateB;
        });

        container.innerHTML = "";
        sortedPosts.forEach(post => container.appendChild(post));
    };

    if (sortByDropdown) {
        sortByDropdown.addEventListener("change", (event) => {
            const selectedOrder = event.target.value;
            sortPosts(".blog-posts", ".blog-post", selectedOrder);
            sortPosts(".project-posts", ".project-post", selectedOrder);
        });

        // Default sort
        sortPosts(".blog-posts", ".blog-post", "newest");
        sortPosts(".project-posts", ".project-post", "newest");
    }
});