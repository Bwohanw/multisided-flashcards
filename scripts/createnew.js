let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    let flashname = document.getElementById("name");
    let info = document.getElementById("topics");
    if (flashname.value == "" || info.value == "") {
        alert("Please enter values");
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

    localStorage.setItem("newname", flashname.value);
    localStorage.setItem("newtopics", info.value);
    window.location.href = "makeflashcards.html";
});