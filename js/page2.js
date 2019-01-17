//---------- Need : Get artist name from local storage -----------
var choice;
var concert;
var artist;
var artistIMG;
var artistName = "";
var artistURL = "";
var artistID = "";
var country = "";
var queryURL = "https://itunes.apple.com/search?term=";
var limit = "&limit=6";
var queryURL2 = "";
//----------------------------------------------------------------
console.log("initial: " + artist);
//console.log(artistIMG);

function test() {
    choice = JSON.parse(sessionStorage.getItem("choice"));
    concert = JSON.parse(sessionStorage.getItem("currentListOfConcerts"));
    //console.log(concert[0]);
    $("#artistName").text(concert[choice].name);
    artist = concert[choice]._embedded.attractions[0].name;
    $("#concertDateHeader").text(concert[choice].dates.start.localDate);
    $("#concertLocationHeader").text(concert[choice]._embedded.venues[0].city.name + ", " + concert[choice]._embedded.venues[0].country.name);
    console.log(artist);
    call1();
}

function call1() {
    console.log(artist);
    queryURL = queryURL + artist + limit;
    $.ajax({
        url: queryURL,
        dataType: 'JSONP', //This gets a JSON object instead of the default UTF8 result.
        method: "GET"
    }).then(function (response) {
        console.log(response.results);
        var results = response.results;

        artistName = results[0].artistName; // Gets the Artist name for preview
        artistURL = results[0].artistViewUrl; // Gets a link to the artists iTunes page
        artistID = results[0].artistId;
        country = response.results[0].country; // Gets the Artist Country for preview.

        $("#pictureName").text(artistName);
        $("#artistPicture").empty();
        $("#artistPicture").append(`
            <img id="${artist}" src="${concert[choice].images[0].url}" height="200px" width="200px">
        `);

        queryURL2 = "https://itunes.apple.com/lookup?id=" + artistID;

        call2();
    });
}

function call2() {
    $.ajax({
        url: queryURL2,
        dataType: "JSONP",
        method: "GET"
    }).then(function (response) {
        console.log(response.results);
    });
}