document.addEventListener("DOMContentLoaded", () => {
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
    const projectPostsContainer = document.querySelector(".project-posts");
    const projectPosts = Array.from(document.querySelectorAll(".project-post"));

    // Function to sort project posts
    const sortProjectPosts = (order) => {
        const sortedPosts = projectPosts.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));

            return order === "newest" ? dateB - dateA : dateA - dateB;
        });

        // Clear and re-append sorted posts
        projectPostsContainer.innerHTML = "";
        sortedPosts.forEach(post => projectPostsContainer.appendChild(post));
    };

    // Example: Add sorting by date (newest first)
    const sortByDate = () => {
        const postsArray = Array.from(projectPosts);
        postsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));
            return dateB - dateA; // Newest first
        });

        projectPostsContainer.innerHTML = ""; // Clear existing posts
        postsArray.forEach(post => projectPostsContainer.appendChild(post)); // Append sorted posts
    };

    // Call sortByDate on page load
    sortByDate();

    // Event listener for the dropdown
    sortByDropdown.addEventListener("change", (event) => {
        const selectedOrder = event.target.value;
        sortProjectPosts(selectedOrder);
    });

    // Default sort on page load (newest first)
    sortProjectPosts("newest");
});
