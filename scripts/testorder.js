existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}
var thesecards = existing[localStorage.getItem("newname")];//the list of flashcards corresponding to this set
var topiclist = Object.keys(thesecards[0]);//a list of all the topics for the corresponding set



let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    var number = document.getElementById("howmany").value;
    if (number > topiclist.length) {
        alert("Please enter the number of sides you would like to be tested on");
        return;
    }
    localStorage.setItem("numsides", number);
    window.location.href = "selectsides.html";
})