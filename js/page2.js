//----------------------------------------------------------------
var choice;
var concert;
var artist;
var artistIMG;

var artistName = "";
var artistURL = "";
var artistID = "";
var country = "";
var queryURL = "https://itunes.apple.com/search?term=";
var limit = "&limit=3";
var queryURL2 = "";

var trackURL = "";
var trackUrlCut = "";
var playSRC = "";

var frame1;
var frame2;
var frame3;
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
            <img id="${artist}" src="${concert[choice].images[0].url}" height="200px" width="250px">
        `);
        $("#arenaName").text(concert[choice]._embedded.venues[0].name);
        let location = concert[choice]._embedded.venues[0].city.name + ", " + concert[choice]._embedded.venues[0].country.name;
        $("#cityCountry").text(location);
        $("#streetAddress").text(concert[choice]._embedded.venues[0].address.line1);

        $("#artistName").text(artistName); //Update the Artist name from iTunes
        $("#artistOrigin").text(country); //Update the Artist

        call2();

    });
}

function call2() {
    $.ajax({
        url: queryURL,
        dataType: 'JSONP', //This gets a JSON object instead of the default UTF8 result.
        method: "GET"
    }).then(function (response) {
        var results = response.results;

        artistName = results[0].artistName; // Gets the Artist name for preview
        artistURL = results[0].artistViewUrl; // Gets a link to the artists iTunes page
        artistID = results[0].artistId;
        country = response.results[0].country; // Gets the Artist Country for preview.

        $("#artistName").text(artistName); //Update the Artist name from iTunes
        $("#artistOrigin").text(country); //Update the Artist

        // Get trackURL for the first embed
        trackURL = results[0].trackViewUrl;
        trackUrlCut = trackURL.slice(34, trackURL.length - 5);
        playSRC = "https://embed.music.apple.com/us/album/" + trackUrlCut + "&app=music"
        $("#frame1").attr("src", playSRC);

        // Get trackURL for the second embed
        trackURL = results[1].trackViewUrl;
        trackUrlCut = trackURL.slice(34, trackURL.length - 5);
        playSRC = "https://embed.music.apple.com/us/album/" + trackUrlCut + "&app=music"
        $("#frame2").attr("src", playSRC);

        // Get trackURL for the third embed
        trackURL = results[2].trackViewUrl; //Get full trackURL
        trackUrlCut = trackURL.slice(34, trackURL.length - 5); //Cut out useless pieces of trackURL
        playSRC = "https://embed.music.apple.com/us/album/" + trackUrlCut + "&app=music"; //Place the part of trackURL kept into the embed src
        $("#frame3").attr("src", playSRC);

    });
}