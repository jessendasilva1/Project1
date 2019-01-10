
var city = "Vancouver";
var apiKey = "IbzK4URLKfi6fOzYfdkwQCKu9b6BRBsU";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=CA&classificationName=music&City=" +city+"&apikey="+apiKey;

console.log(queryURL);

$.ajax ({
    url: queryURL,
    method: "GET",
    async:true,
    dataType: "json"
}).then(function(response) {
    console.log(response._embedded.events);

    var results = response._embedded.events;

});
