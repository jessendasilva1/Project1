  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAbiWLekOyhvUJqEJg70nZ9O1sSB9ZL8AI",
    authDomain: "project1-ad591.firebaseapp.com",
    databaseURL: "https://project1-ad591.firebaseio.com",
    projectId: "project1-ad591",
    storageBucket: "project1-ad591.appspot.com",
    messagingSenderId: "1071468730719"
  };

 firebase.initializeApp(config)
  
 //create a variable to reference the database
 var dataRef = firebase.database();



  // Initial Valutes
  var artist = "";
  var artistIMG = "";
  var city = "";



//listen event to take search bar input and pass to the city variable
$("#runSearch").on("click", function(event){
    event.preventDefault();
    city = $("#searchBox").val().trim();
    search(city);

    // Code for the push to firebase
    dataRef.ref().push({
        city: city,
    });
});


// Firebase watcher + initial loader HINT: .on("value")
dataRef.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(childSnapshot){

     // Change the HTML to reflect
     //$("#recentSearches").append(childSnapshot.val().city); 
     $("#recentSearches").prepend("<div class='well'><span class='city-name'> " +
     childSnapshot.val().city + " </span></div>");


    // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
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






  
