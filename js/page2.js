
var artist = "YBN Nahmir";
var queryURL = "https://itunes.apple.com/search?term=" + artist + "&limit=3";

var artistName = "";
var artistURL = "";
var artistID = "";
var country = "";

var trackURL = "";
var trackUrlCut = "";
var playSRC = "";

var frame1;
var frame2;
var frame3;

$.ajax({
    url: queryURL,
    dataType: 'JSONP', //This gets a JSON object instead of the default UTF8 result.
    method: "GET"
}).then(function (response) {
    var results = response.results;

    artistName = results[0].artistName;// Gets the Artist name for preview
    artistURL = results[0].artistViewUrl;// Gets a link to the artists iTunes page
    artistID = results[0].artistId;
    country = response.results[0].country;// Gets the Artist Country for preview.

    $("#artistName").text(artistName);//Update the Artist name from iTunes
    $("#artistOrigin").text(country);//Update the Artist

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
        trackURL = results[2].trackViewUrl;//Get full trackURL
        trackUrlCut = trackURL.slice(34, trackURL.length - 5);//Cut out useless pieces of trackURL
        playSRC = "https://embed.music.apple.com/us/album/" + trackUrlCut + "&app=music";//Place the part of trackURL kept into the embed src
        $("#frame3").attr("src", playSRC);

});