export function setPageDescription(description) {
    const pageDescription = document.querySelector('meta[name="description"]');
    if (pageDescription) {
        pageDescription.setAttribute("content", description);
    } else {
        const newDescription = document.createElement("meta");
        newDescription.name = "description";
        newDescription.content = description;
        document.head.appendChild(newDescription);
    }
}