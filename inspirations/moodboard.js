document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable");
    const moodboard = document.querySelector(".moodboard");

    // Randomly position each draggable image within the moodboard container
    draggables.forEach(draggable => {
        const moodboardRect = moodboard.getBoundingClientRect();
        const randomX = Math.random() * (moodboardRect.width - draggable.offsetWidth);
        const randomY = Math.random() * (moodboardRect.height - draggable.offsetHeight);

        draggable.style.position = "absolute";
        draggable.style.left = `${randomX}px`;
        draggable.style.top = `${randomY}px`;

        // Add drag-and-drop functionality
        draggable.addEventListener("mousedown", (e) => {
            e.preventDefault(); // Prevent default behavior

            // Calculate the offset between the mouse pointer and the draggable element
            const shiftX = e.clientX - draggable.getBoundingClientRect().left;
            const shiftY = e.clientY - draggable.getBoundingClientRect().top;

            const moveAt = (clientX, clientY) => {
                const moodboardRect = moodboard.getBoundingClientRect();

                // Calculate new positions relative to the moodboard container
                const newX = Math.min(
                    Math.max(0, clientX - shiftX - moodboardRect.left),
                    moodboardRect.width - draggable.offsetWidth
                );
                const newY = Math.min(
                    Math.max(0, clientY - shiftY - moodboardRect.top),
                    moodboardRect.height - draggable.offsetHeight
                );

                draggable.style.left = `${newX}px`;
                draggable.style.top = `${newY}px`;
            };

            // Move the element to the mouse position on `mousemove`
            const onMouseMove = (e) => {
                moveAt(e.clientX, e.clientY);
            };

            // Attach the `mousemove` event to the document for smooth dragging
            document.addEventListener("mousemove", onMouseMove);

            // Remove the `mousemove` event on `mouseup`
            document.addEventListener(
                "mouseup",
                () => {
                    document.removeEventListener("mousemove", onMouseMove);
                },
                { once: true }
            );
        });

        draggable.ondragstart = () => false; // Disable default drag behavior
    });
});