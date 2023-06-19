let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    let flashname = document.getElementById("name");
    let info = document.getElementById("topics");
    if (flashname.value == "" || info.value == "") {
        alert("Please enter values in both areas");
        return;
    }
    var arr = info.value.split(';');

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].trim();
    }

    var filteredarr = arr.filter(function(value, index, arr) {
        return arr[index].length > 0;
    });
    
    if (filteredarr.length <= 1) {
        alert("Please enter more than 1 topic");
        return;
    }

    const unique = new Set();
    for (var i = 0; i < filteredarr.length; i++) {
        unique.add(filteredarr[i]);
    }
    if (unique.size != filteredarr.length) {
        alert("Please enter unique topics");
        return;
    }

    var existing = {}
    try {
        var temp = localStorage.getItem("flashcardset");
        if (temp != null) {
            existing = JSON.parse(temp);
        } else {
            existing = {};
        }
    } catch {}
    const keys = Object.keys(existing);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] === flashname.value) {
            alert("please enter a unique name for your new flashcard deck!");
            return;
        }
    }

    localStorage.setItem("newname", flashname.value);
    localStorage.setItem("newtopics", info.value);
    window.location.href = "makeflashcards.html";
});