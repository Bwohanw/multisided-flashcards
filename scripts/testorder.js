existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}
var thesecards = existing[localStorage.getItem("newname")];//the list of flashcards corresponding to this set
var topiclist = Object.keys(thesecards[0]);//a list of all the topics for the corresponding set



document.querySelector(".formbox h2").innerHTML = "Selected Deck: " + localStorage.getItem("newname");
document.querySelector(".formbox p").innerHTML = "Maximum: " + topiclist.length + " sides";

let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    var number = document.getElementById("howmany").value;
    if (number > topiclist.length) {
        alert("Too many sides, try a smaller number.");
        return;
    }
    localStorage.setItem("numsides", number);
    window.location.href = "selectsides.html";
})