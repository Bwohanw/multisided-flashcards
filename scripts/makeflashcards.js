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

//populates the first flashcard that the user is given
populateemptyflashcard();

document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';

document.getElementById("flipside").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    try {
        flashcards[whichcard][topic] = document.getElementById("text").value;
    } catch {
        flashcards[whichcard][topic] = "";
    }
    whichtopic = (whichtopic + 1) % numTopics;
    document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
    document.getElementById("text").value = flashcards[whichcard][filteredarr[whichtopic]];

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
    document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
    document.getElementById("text").value = "";//empty since it's new for sure
    console.log(flashcards);
});

document.getElementById("langle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = whichcard-1 < 0 ? flashcards.length - 1 : whichcard-1;
    document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
    document.getElementById("text").value = flashcards[whichcard][filteredarr[0]];
    console.log(flashcards);
})

document.getElementById("rangle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = (whichcard + 1) % flashcards.length;
    document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
    document.getElementById("text").value = flashcards[whichcard][filteredarr[0]];
    console.log(flashcards);
})

document.getElementById("delete").addEventListener('click', () => {
    if (flashcards.length == 1) {
        populateemptyflashcard();
        whichtopic = 0;
        whichcard = 0;
        document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
        document.getElementById("text").value = "";
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
        document.querySelector(".topic h1").innerHTML = filteredarr[whichtopic] + ':';
        document.getElementById("text").value = flashcards[whichcard][filteredarr[0]];
    }
    console.log(flashcards);
})