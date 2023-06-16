existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}
var thesecards = existing[localStorage.getItem("newname")];//the list of flashcards corresponding to this set
var topiclist = Object.keys(thesecards[0]);//a list of all the topics for the corresponding set
const totalsides = localStorage.getItem("numsides");//the total number of topics you want to be tested on

var remainder = totalsides; //number of remaining topics to choose

var topicorder = []; //array of the topics in order
const tombstoning = []; //array of 1 and -1 used for tombstoning the topics, if it's a -1 the topic has been chosen before, 1 otherwise.
//currently not used because i'm removing from the selector instead of adding to it, and it might mess with indexing
for (var i = 0; i < topiclist.length; i++) {
    tombstoning.push(1);
}

document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + remainder + " left to choose";

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
        addOption(topiclist[i]);
    }
}



addAvailableOptions();
let infoform = document.getElementById("formcontent");
infoform.addEventListener("submit", (e) => {
    e.preventDefault();
    var x = document.getElementById("flashcardlist");
    var idx = x.selectedIndex;
    topicorder.push(topiclist[idx]);

    var temp = [];
    for (var i = 0; i < topiclist.length; i++) {
        if (i != idx) {
            temp.push(topiclist[i]);
        }
    }

    topiclist = temp;
    remainder--;

    x.remove(idx);
    console.log(topicorder);

    document.querySelector(".formbox h1").innerHTML = "Pick the next side you would like to be tested on:";
    document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + remainder + " left to choose";

    var x = document.createElement("OL");
    x.setAttribute("id", "sideorder");
    document.body.appendChild(x);

    var y = document.createElement("LI");
    var t = document.createTextNode(topicorder[topicorder.length - 1]);
    y.appendChild(t);
    document.getElementById("sideorder").appendChild(y);

    if (remainder === 0) {
        var storage = topicorder.join(';');
        localStorage.setItem("flashcardorder", storage);
        window.location.href = "testflashcards.html";
    }
})


document.getElementById("undo").addEventListener("click", (e) => {
    e.preventDefault();
    if (topicorder.length === 0) {
        document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
        document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + remainder + " left to choose";
        return;
    }
    remainder++;
    if (remainder==totalsides) {
        document.querySelector(".formbox h1").innerHTML = "Pick the first side you would like to be tested on:";
        document.querySelector(".formbox p").innerHTML = "Total sides: " + totalsides + ", " + remainder + " left to choose";
    }
    if (remainder > totalsides) remainder = totalsides;

    var list=document.getElementById("sideorder");
    var listItems = list.getElementsByTagName("li");
    var last=listItems[listItems.length-1];
    list.removeChild(last);

    var latest = topicorder.pop();
    topiclist.push(latest)
    addOption(latest);
})
