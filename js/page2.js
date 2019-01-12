//---------- Need : Get artist name from local storage -----------
var artist = sessionStorage.getItem("artist");
var artistIMG = sessionStorage.getItem("artistIMG");
//----------------------------------------------------------------
console.log(artist);
console.log(artistIMG);

var queryURL = "https://itunes.apple.com/search?term="+ artist +"&limit=6";
var queryURL2 = "";

var artistName = "";
var artistURL = "";
var artistID = "";
var country = "";

$.ajax({
    url: queryURL,
    dataType: 'JSONP', //This gets a JSON object instead of the default UTF8 result.
    method: "GET"
}).then(function (response) {
    console.log(response.results);
    var results = response.results;

    artistName = results[0].artistName;// Gets the Artist name for preview
    artistURL = results[0].artistViewUrl;// Gets a link to the artists iTunes page
    artistID = results[0].artistId;
    country = response.results[0].country;// Gets the Artist Country for preview.

    queryURL2 = "https://itunes.apple.com/lookup?id=" + artistID;//

    call2();
});

function call2() {
    $.ajax({
        url: queryURL2,
        dataType: "JSONP",
        method: "GET"
    }).then(function (response) {
        console.log(response.results);
    });
}