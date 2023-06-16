existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}

const keylist = Object.keys(existing);


function addOption(element) {
    var option = document.createElement("option");
    option.setAttribute("value", element);
    var textNode = document.createTextNode(element);
    option.appendChild(textNode);
    var selector = document.getElementById("flashcardlist");
    selector.appendChild(option);
}


for (var i = 0; i < keylist.length; i++) {
    addOption(keylist[i]);
}

let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    var setname = document.getElementById("flashcardlist").value;
    if (setname.length === 0) {
        alert("Create a flashcard deck first!");
        return;
    }
    localStorage.setItem("newname", setname);
    var cardlist = existing[setname];
    var topiclist = Object.keys(cardlist[0]);
    let topics = topiclist.join(';');
    
    localStorage.setItem("newtopics", topics);
    window.location.href="editortest.html";
})