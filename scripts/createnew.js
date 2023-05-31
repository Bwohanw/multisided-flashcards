let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    let flashname = document.getElementById("name");
    let info = document.getElementById("topics");
    if (flashname.value == "" || info.value == "") {
        alert("Please enter values");
        return;
    }
    localStorage.setItem("newname", flashname.value);
    localStorage.setItem("newtopics", info.value);
    window.location.href = "makeflashcards.html";
});