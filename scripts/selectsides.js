existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}
var thesecards = existing[localStorage.getItem("newname")];//the list of flashcards corresponding to this set
var topiclist = Object.keys(thesecards[0]);//a list of all the topics for the corresponding set
const totalsides = localStorage.getItem("numsides");//the total number of topics you want to be tested on

var remaining = totalsides; //number of remaining topics to choose

const topicorder = [];

document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + remaining + " left to choose";