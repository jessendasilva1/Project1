
var city = "Vancouver";
var apiKey = "IbzK4URLKfi6fOzYfdkwQCKu9b6BRBsU";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&City=" +city+"&apikey="+apiKey;

var artist = "";
var artistIMG = "";

console.log(queryURL);

$.ajax ({
    url: queryURL,
    method: "GET",
    async:true,
    dataType: "json"
}).then(function(response) {
    console.log(response._embedded.events);

    var results = response._embedded.events;

    artist = response._embedded.events[0]._embedded.attractions[0].name;// Gets artist name from the ticketmaster event results
    sessionStorage.setItem("artist", artist);//Place artist name into local storage to be used in the search query on pg.2

    artistIMG = response._embedded.events[0].images[0].url;//Gets artist img url for profile on pg.2
    sessionStorage.setItem("artistIMG", artistIMG);//Place img URL into local storage to be used on pg.2

});
