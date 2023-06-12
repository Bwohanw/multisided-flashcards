var newname = localStorage.getItem("newname");
var topics = localStorage.getItem("newtopics");

var arr = topics.split(';');

for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].trim();
}

var filteredarr = arr.filter(function(value, index, arr) {
    return arr[index].length > 0;
});

const numTopics = filteredarr.length;

var whichtopic = 0;
var whichcard = 0; //index of the current flashcard
var flashcards = [{}];


function populateemptyflashcard() {
    for (var i = 0; i < numTopics; i++) {
        flashcards[whichcard][filteredarr[i]] = "";
    }
}

function updateinfo() {
    document.querySelector(".topic h2").innerHTML = filteredarr[whichtopic] + ':';
    document.querySelector(".topic p").innerHTML = 'card ' + (whichcard + 1) + '/' + flashcards.length + ", side " + (whichtopic+1)  + '/' + filteredarr.length;
    document.getElementById("text").value = flashcards[whichcard][filteredarr[whichtopic]];
}

//populates the first flashcard that the user is given
populateemptyflashcard();


document.querySelector(".topic h1").innerHTML = newname;
document.querySelector(".topic h2").innerHTML = filteredarr[whichtopic] + ':';
document.querySelector(".topic p").innerHTML = 'card ' + (whichcard + 1) + '/' + flashcards.length + ", side " + (whichtopic+1)  + '/' + filteredarr.length;

document.getElementById("flipside").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    try {
        flashcards[whichcard][topic] = document.getElementById("text").value;
    } catch {
        flashcards[whichcard][topic] = "";
    }
    whichtopic = (whichtopic + 1) % numTopics;
    updateinfo();

    console.log(flashcards);
});

document.getElementById("newcard").addEventListener('click', () => {
    //saves the current data from the card that they have
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;
    //resets the topic for consistency between cards and also sets the flashcard we're adding to to the end
    //We make it the length because we'll be increasing the number of elements by 1 right after.
    whichtopic = 0;
    whichcard = flashcards.length;
    flashcards.push({});

    //populates the flashcard that was just pushed
    populateemptyflashcard();
    updateinfo();
    console.log(flashcards);
});

document.getElementById("langle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = whichcard-1 < 0 ? flashcards.length - 1 : whichcard-1;
    updateinfo();
    console.log(flashcards);
})

document.getElementById("rangle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = (whichcard + 1) % flashcards.length;
    updateinfo();
    console.log(flashcards);
})

document.getElementById("delete").addEventListener('click', () => {
    if (flashcards.length == 1) {
        populateemptyflashcard();
        whichtopic = 0;
        whichcard = 0;
        updateinfo();
    } else {
        var newarr = [];
        for (var i = 0; i < flashcards.length; i++) {
            if (i != whichcard) {
                newarr.push(flashcards[i]);
            }
        }
        flashcards = newarr;
        whichtopic = 0;
        whichcard = whichcard - 1 < 0 ? flashcards.length - 1 : whichcard - 1;
        updateinfo();
    }
    console.log(flashcards);
})