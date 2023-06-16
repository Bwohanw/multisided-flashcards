

document.querySelector(".container h2").innerHTML = "Selected Deck: " + localStorage.getItem("newname");

document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this deck?")) {
        existing = {}
        temp = localStorage.getItem("flashcardset");
        if (temp != null) {
            existing = JSON.parse(temp);
        }
        delete existing[localStorage.getItem("newname")];
        localStorage.setItem("flashcardset", JSON.stringify(existing));
        localStorage.setItem("newname", "");
        localStorage.setItem("newtopics", "");
        window.location.href = "index.html";
    }
});