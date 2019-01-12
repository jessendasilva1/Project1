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

