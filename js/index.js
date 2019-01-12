var artist = "";
var artistIMG = "";

//listen event to take search bar input and pass to the city variable
$("#runSearch").on("click", function(event){
    event.preventDefault();
    var city = $("#searchBox").val().trim();
    search(city);
});


//function to perform the city search and display top results
function search(city){
    $("#searchResults").empty();
    var apiKey = "IbzK4URLKfi6fOzYfdkwQCKu9b6BRBsU";
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&City="+city+"&apikey="+apiKey;
        $.ajax ({
            url: queryURL,
            method: "GET",
            async:true,
            dataType: "json"
        }).then(function(response) {

            var results = response._embedded.events;
            console.log(results);
          
          
            artist = response._embedded.events[0]._embedded.attractions[0].name;// Gets artist name from the ticketmaster event results
            sessionStorage.setItem("artist", artist);//Place artist name into local storage to be used in the search query on pg.2
            artistIMG = response._embedded.events[0].images[0].url;//Gets artist img url for profile on pg.2
            sessionStorage.setItem("artistIMG", artistIMG);//Place img URL into local storage to be used on pg.2
          
          
            for (var i = 0; i < results.length; i++){

            var searchList = $("<ul>");
            searchList.addClass("list-group");
            $("#searchResults").append(searchList);
            
            var name = (results[i].name);
            var date = (results[i].dates.start.localDate);
            var venue = (results[i]._embedded.venues[0].name);
        

                var list = $("<li>");
                list.text(date + " " + name + " " + venue);
                $("#searchResults").append(list);

            }
        });
}
