existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}
var thesecards = existing[localStorage.getItem("newname")];//the list of flashcards corresponding to this set
var topiclist = Object.keys(thesecards[0]);//a list of all the topics for the corresponding set
const totalsides = localStorage.getItem("numsides");//the total number of topics you want to be tested on

var counter = 0; //number of remaining topics to choose

const topicorder = []; //array of integers representing the index order of the topics
const tombstoning = []; //array of 1 and -1 used for tombstoning the topics, if it's a -1 the topic has been chosen before, 1 otherwise.
//currently not used because i'm removing from the selector instead of adding to it
for (var i = 0; i < topiclist.length; i++) {
    tombstoning.push(1);
}

document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + totalsides-counter + " left to choose";

function addOption(element) {
    var option = document.createElement("option");
    option.setAttribute("value", element);
    var textNode = document.createTextNode(element);
    option.appendChild(textNode);
    var selector = document.getElementById("flashcardlist");
    selector.appendChild(option);
}

function addAvailableOptions() {
    for (var i = 0; i < topiclist.length; i++) {
        if (tombstoning[i] === 1) {
            addOption(topiclist[i]);
        }
    }
}



addAvailableOptions();
let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    var x = document.getElementById("flashcardlist");
    var idx = x.selectedIndex;
    topicorder.push(idx);
    tombstoning[idx] = -1;
    counter++;
    x.remove(idx);

    document.querySelector(".formbox h1").innerHTML = "Pick the next side you would like to be tested on:";
    document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + totalsides-counter + " left to choose";

    var x = document.createElement("OL");
    x.setAttribute("id", "sideorder");
    document.body.appendChild(x);

    var y = document.createElement("LI");
    var t = document.createTextNode(topiclist[idx]);
    y.appendChild(t);
    document.getElementById("sideorder").appendChild(y);
})


document.getElementById("undo").addEventListener("click", (e) => {
    e.preventDefault();
    if (topicorder.length === 0) {
        document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
        document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + (totalsides-counter) + " left to choose";
        return;
    }
    counter--;
    if (counter === 1) {
        document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
        document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + (totalsides-counter) + " left to choose";
    }

    var list=document.getElementById("sideorder");
    var listItems = list.getElementsByTagName("li");
    var last=listItems[listItems.length-1];
    list.removeChild(last);

    var latest = topicorder.pop();
    tombstoning[latest] = 1;
    addOption(topiclist[latest]);
})
