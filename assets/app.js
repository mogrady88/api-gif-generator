$(document).ready(function(){

var gifLimit = 10;
var topics = ['george clooney','shakira', 'elvis', 'ewan mcgregor', 'jennifer aniston', 'natalie portman', 'tom hanks', 'chris pratt', 'tom cruise', 'john stamos'];

// Function to render buttons from array. Call for it down below
function renderButtons(){

$("#button-div").empty();

for (i=0; i< topics.length; i++){
    var a = $("<button>");
    a.addClass("celeb");
    a.attr("data-celeb", topics[i]);
    a.text(topics[i]);
    $("#button-div").append(a);
    // console.log(i + "- " + topics[i]);
    }
}

// Function to add new celebrity to array. Rerun renderButtons
$("#add-celeb").on('click', function(){
    event.preventDefault();

    var celeb = $("#celeb-input").val().trim();
    topics.push(celeb);

    renderButtons();
})

// Function to add gifs on button click.
function displayCelebGifs(){
    $("#gif-display").empty();

    var celeb = $(this).attr("data-celeb");   

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    celeb + "&api_key=VYKc4IHTOFQ8yOZuxHzMNEynw1qwrVrH";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
         console.log(response);
         var results = response.data;

         for (var i = 0; i < gifLimit; i++){
             var celebDiv = $("<div>");
             celebDiv.addClass("cDiv");
             var p = $("<p>").text("Rating: " + results[i].rating);
             var celebImage = $("<img id='cImage'>");
             celebImage.attr("src", results[i].images.fixed_height_still.url);
             celebImage.attr("data-state", "still");
             celebImage.attr("data-still", results[i].images.fixed_height_still.url);
             celebImage.attr("data-animate", results[i].images.fixed_height.url);
             celebDiv.append(celebImage);
             celebDiv.append(p);
             $("#gif-display").prepend(celebDiv);  
         }
        });
}

// Loads gifs when you click on a button with class 'celeb'
$(document).on("click", ".celeb", displayCelebGifs);

// Changes state of Gif when you click on individual images
$(document).on("click", "#cImage", function() {
    
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

renderButtons();
});