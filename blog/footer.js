document.addEventListener("DOMContentLoaded", function () {
    fetch("../footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("site-footer").innerHTML = data;
            let link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "../footer.css";
            document.head.appendChild(link);
        });
});