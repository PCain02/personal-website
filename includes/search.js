document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const searchResultsContainer = document.getElementById("search-results");

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        searchResultsContainer.innerHTML = ""; // Clear previous results

        if (query === "") {
            searchResultsContainer.innerHTML = "<p>Please enter a search query.</p>";
            return;
        }

        const elements = document.querySelectorAll("h1, h2, h3, p, li"); // Elements to search in
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

        // Update the search results page URL with the query
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    // Trigger search on button click
    searchButton.addEventListener("click", performSearch);

    // Trigger search on pressing Enter
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            perfor

    
    const filterButtons = document.querySelectorAll(".filter-button");
    const blogPosts = document.querySelectorAll(".blog-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            blogPosts.forEach(post => {
                const postTopics = post.getAttribute("data-topic").split(" "); // Split topics into an array
                if (topic === "all" || postTopics.includes(topic)) {
                    post.classList.remove("hidden"); // Show the post
                } else {
                    post.classList.add("hidden"); // Hide the post
                }
            });
        });
    });
mSearch();
        

    
    const filterButtons = document.querySelectorAll(".filter-button");
    const blogPosts = document.querySelectorAll(".blog-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            blogPosts.forEach(post => {
                const postTopics = post.getAttribute("data-topic").split(" "); // Split topics into an array
                if (topic === "all" || postTopics.includes(topic)) {
                    post.classList.remove("hidden"); // Show the post
                } else {
                    post.classList.add("hidden"); // Hide the post
                }
            });
        });
    });
}
    });


    
    const filterButtons = document.querySelectorAll(".filter-button");
    const blogPosts = document.querySelectorAll(".blog-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            blogPosts.forEach(post => {
                const postTopics = post.getAttribute("data-topic").split(" "); // Split topics into an array
                if (topic === "all" || postTopics.includes(topic)) {
                    post.classList.remove("hidden"); // Show the post
                } else {
                    post.classList.add("hidden"); // Hide the post
                }
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-button");
    const blogPosts = document.querySelectorAll(".blog-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            blogPosts.forEach(post => {
                const postTopics = post.getAttribute("data-topic").split(" "); // Split topics into an array
                if (topic === "all" || postTopics.includes(topic)) {
                    post.classList.remove("hidden"); // Show the post
                } else {
                    post.classList.add("hidden"); // Hide the post
                }
            });
        });
    });

    // Example: Add sorting by date (newest first)
    const sortByDate = () => {
        const postsArray = Array.from(blogPosts);
        postsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));
            return dateB - dateA; // Newest first
        });

        const blogPostsContainer = document.querySelector(".blog-posts");
        blogPostsContainer.innerHTML = ""; // Clear existing posts
        postsArray.forEach(post => blogPostsContainer.appendChild(post)); // Append sorted posts
    };

    // Call sortByDate on page load
    sortByDate();
});

document.addEventListener("DOMContentLoaded", () => {
    const sortByDropdown = document.getElementById("sort-by");
    const blogPostsContainer = document.querySelector(".blog-posts");
    const blogPosts = Array.from(document.querySelectorAll(".blog-post"));

    // Function to sort blog posts
    const sortBlogPosts = (order) => {
        const sortedPosts = blogPosts.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));

            return order === "newest" ? dateB - dateA : dateA - dateB;
        });

        // Clear and re-append sorted posts
        blogPostsContainer.innerHTML = "";
        sortedPosts.forEach(post => blogPostsContainer.appendChild(post));
    };

    // Event listener for the dropdown
    sortByDropdown.addEventListener("change", (event) => {
        const selectedOrder = event.target.value;
        sortBlogPosts(selectedOrder);
    });

    // Default sort on page load (newest first)
    sortBlogPosts("newest");
});


document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-button");
    const projectPosts = document.querySelectorAll(".project-post");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const topic = button.getAttribute("data-topic");

            projectPosts.forEach(post => {
                const postTopics = post.getAttribute("data-topic").split(" "); // Split topics into an array
                if (topic === "all" || postTopics.includes(topic)) {
                    post.classList.remove("hidden"); // Show the post
                } else {
                    post.classList.add("hidden"); // Hide the post
                }
            });
        });
    });

    // Example: Add sorting by date (newest first)
    const sortByDate = () => {
        const postsArray = Array.from(projectPosts);
        postsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));
            return dateB - dateA; // Newest first
        });

        const projectPostsContainer = document.querySelector(".project-posts");
        projectPostsContainer.innerHTML = ""; // Clear existing posts
        postsArray.forEach(post => projectPostsContainer.appendChild(post)); // Append sorted posts
    };

    // Call sortByDate on page load
    sortByDate();
});

document.addEventListener("DOMContentLoaded", () => {
    const sortByDropdown = document.getElementById("sort-by");
    const projectPostsContainer = document.querySelector(".project-posts");
    const projectPosts = Array.from(document.querySelectorAll(".project-post"));

    // Function to sort project posts
    const sortprojectPosts = (order) => {
        const sortedPosts = projectPosts.sort((a, b) => {
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));

            return order === "newest" ? dateB - dateA : dateA - dateB;
        });

        // Clear and re-append sorted posts
        projectPostsContainer.innerHTML = "";
        sortedPosts.forEach(post => projectPostsContainer.appendChild(post));
    };

    // Event listener for the dropdown
    sortByDropdown.addEventListener("change", (event) => {
        const selectedOrder = event.target.value;
        sortprojectPosts(selectedOrder);
    });

    // Default sort on page load (newest first)
    sortprojectPosts("newest");
});

// search.js
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    function redirectToSearchPage() {
        const query = searchInput.value.trim();
        if (query !== "") {
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }

    searchButton?.addEventListener("click", redirectToSearchPage);
    searchInput?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            redirectToSearchPage();
        }
    });
});