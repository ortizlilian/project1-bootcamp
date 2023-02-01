let city = '';
let eventsObject = [];



$('#searchBtn').on('click', function(event) {
    event.preventDefault();

    city = $('#cityInput').val();
    
    let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=100&city="+city+"&sort=date,name,asc&apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        // console.log(response);
        let eventsArray = response._embedded.events;
        let eventsObject = [];

        for (let i = 0; i < eventsArray.length; i++) {
            let event = {
                name: eventsArray[i].name,
                date: eventsArray[i].dates.start.localDate,
                link: eventsArray[i].url
            }
            eventsObject.push(event);
        }            
        // populateEventDiv(eventsObject);
    });
});






// let queryExcuserOffice = "https://excuser-three.vercel.app/v1/excuse/office"

// $.ajax({
//     url: queryExcuserOffice,
//     method: "GET"
// })
// .then(function(response) {
//     console.log(response);
// });

// let queryExcuserFamily = "https://excuser-three.vercel.app/v1/excuse/family"

// $.ajax({
//     url: queryExcuserFamily,
//     method: "GET"
// })
// .then(function(response) {
//     console.log(response);
// });

// let queryExcuserChildren = "https://excuser-three.vercel.app/v1/excuse/children"

// $.ajax({
//     url: queryExcuserChildren,
//     method: "GET"
// })
// .then(function(response) {
//     console.log(response);
// });

// let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"
// let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=100&city=london&sort=date,name,asc&apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"

// $.ajax({
//     url: queryURL,
// @ -37,4 +37,6 @@ $.ajax({
// })
// .then(function(response) {
//     console.log(response);
// });
// });

// // Parameter for date search ticketmaster api startDateTime=2023-01-31T00:00:00Z