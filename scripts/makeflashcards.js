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
console.log(numTopics);