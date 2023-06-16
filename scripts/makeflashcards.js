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

//saves the flashcard data to localstorage
function savedata() {
    var existing = {};
    try {
        temp = localStorage.getItem("flashcardset");
        console.log(temp);
        if (temp == null) {
            existing = {};
        } else {
            existing = JSON.parse(temp);
        }
    } catch {
    }
    existing[newname] = flashcards;
    console.log(existing);
    localStorage.setItem("flashcardset", JSON.stringify(existing));
}


//tries to get an existing flashcard set from localstorage with that name. If none exists, it creates a new one
//it should always create a new one when the user is making an new set. However, it should get from localstorage whenever
//the user is editing a previous set or returns to editing after pressing the finish button.
try {
    console.log("retrieve from localstorage");
    var temp = localStorage.getItem("flashcardset");
    console.log(temp);
    if (temp != null) {
        var existing = JSON.parse(temp);
        console.log(existing);
        flashcards = existing[newname];
        console.log(flashcards);
        if (flashcards === undefined) {
            console.log("was undefined, a new flashcard set");
            flashcards = [{}];
            populateemptyflashcard();
        }
    } else {
        console.log("populating empty flashcard set");
        populateemptyflashcard();
    }
} catch {
    console.log("failed to get flashcards from localstorage to set initilaly");
    //populates the first flashcard that the user is given
    populateemptyflashcard();
}



document.getElementById("text").value = flashcards[whichcard][filteredarr[whichtopic]]; //in case we're updating the info from localstorage
//we have to set the text value of the initial card

document.querySelector(".topic h1").innerHTML = "Flashcard Set: " + newname;
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

    savedata();
    console.log(flashcards);
});

document.getElementById("newcard").addEventListener('click', () => {
    //saves the current data from the card that they have
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;
    whichtopic = 0;
    //inserts the new flashcard at the position we created it in
    var newflashcards = [];
    for (var i = 0; i < flashcards.length; i++) {
        newflashcards.push(flashcards[i]);
        if (i==whichcard) {
            newflashcards.push({});
        }
    }
    whichcard++;
    flashcards = newflashcards;
    
    //populates the flashcard that was just pushed
    populateemptyflashcard();
    updateinfo();

    savedata();
    console.log(flashcards);
});

document.getElementById("langle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = whichcard-1 < 0 ? flashcards.length - 1 : whichcard-1;
    updateinfo();

    savedata();
    console.log(flashcards);
})

document.getElementById("rangle").addEventListener('click', () => {
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    whichtopic = 0;
    whichcard = (whichcard + 1) % flashcards.length;
    updateinfo();

    savedata();
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

    savedata();
    console.log(flashcards);
})

document.getElementById("finish").addEventListener("click", () => {
    //saves whatever is in the final slide in case this was the only button clicked after entering it
    var topic = filteredarr[whichtopic];
    flashcards[whichcard][topic] = document.getElementById("text").value;

    savedata();
    window.location.href = "confirmedit.html";
})