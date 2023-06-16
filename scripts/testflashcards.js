var newname = localStorage.getItem("newname");

existing = {}
temp = localStorage.getItem("flashcardset");
if (temp != null) {
    existing = JSON.parse(temp);
}

var flashcards = existing[newname];//the list of flashcards in order
var shuffledindexes = []//list of indices of the flashcards list that will make shuffling easier
for (var i = 0; i < flashcards.length; i++) {
    shuffledindexes.push(i);
}

const topics = localStorage.getItem("flashcardorder");//list of the topics actually being studied
var topicsarr = topics.split(';');

var whichtopic = 0;
var whichcard = 0;

const numTopics = topicsarr.length;

var appearanceorder = "";
for (var i = 0; i < topicsarr.length-1; i++) {
    appearanceorder = appearanceorder + topicsarr[i] + ', ';
}
appearanceorder += topicsarr[topicsarr.length-1];

function updateinfo() {
    document.querySelector(".topic h3").innerHTML = topicsarr[whichtopic] + ':';
    document.querySelector(".topic p").innerHTML = 'card ' + (whichcard + 1) + '/' + flashcards.length + ", side " + (whichtopic+1)  + '/' + topicsarr.length + ', Order of appearance:' + appearanceorder;
    document.querySelector(".notes h1").innerHTML = flashcards[shuffledindexes[whichcard]][topicsarr[whichtopic]];
}

function shuffle(array) {
    let cindex = array.length, randomIndex;
    while (cindex != 0) {
        randomIndex = Math.floor(Math.random() * cindex);
        cindex--;
        var temp = array[cindex];
        array[cindex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}

shuffledindexes = shuffle(shuffledindexes);

document.querySelector(".notes h1").innerHTML = flashcards[shuffledindexes[whichcard]][topicsarr[whichtopic]];

document.querySelector(".topic h2").innerHTML = "Flashcard Set: " + newname;
document.querySelector(".topic h3").innerHTML = topicsarr[whichtopic] + ':';
document.querySelector(".topic p").innerHTML = 'card ' + (whichcard + 1) + '/' + flashcards.length + ", side " + (whichtopic+1)  + '/' + topicsarr.length + ', Order of appearance: ' + appearanceorder;


document.getElementById("flipside").addEventListener('click', () => {


    whichtopic = (whichtopic + 1) % numTopics;
    updateinfo();

});

document.getElementById("langle").addEventListener('click', () => {

    whichtopic = 0;
    whichcard = whichcard-1 < 0 ? flashcards.length - 1 : whichcard-1;
    updateinfo();

    console.log(flashcards);
})

document.getElementById("rangle").addEventListener('click', () => {

    whichtopic = 0;
    whichcard = (whichcard + 1) % flashcards.length;
    updateinfo();

    console.log(flashcards);
})

document.getElementById("finish").addEventListener("click", () => {
    window.location.href = "index.html";
})

document.getElementById("shuffle").addEventListener("click", () => {
    shuffledindexes = shuffle(shuffledindexes);
    whichtopic = 0;
    whichcard = 0;
    updateinfo();
})