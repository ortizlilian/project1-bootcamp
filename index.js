let city = '';
let eventsObject = [];
let yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');

// function removeDuplicate(array) {
//     let fiveEvents = [];
//     let i = 0;
//     while (fiveEvents.length < 11) {
//         if (fiveEvents.name.includes(array[i].name) != true) {
//             fiveEvents.push(array[i]);
//             i++;
//         } else i++;
//     } return fiveEvents;
// }

function populateEventDiv(array) {
    // id for the container that will hold events
    $('#eventsContainer').empty();

    for (let i = 0; i < array.length; i++) {
        let eventDiv = $(`
            <div class="row events-tiles">
                <h3>${array[i].name}</h3>
                <h4>${array[i].date}</h4>
                <a target="_blank" href=${array[i].link}>More details here</a>
            </div>
        `);
        // tested in weather container, but it needs to be inside event container
        $('#weatherContainer').append(eventDiv);
        
    }
}

$('#searchBtn').on('click', function(event) {
    event.preventDefault();

    city = $('#cityInput').val();

    // WEATHER API CALL
    let queryGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=3b515d44aff736d8b6cbd98468bd1dfb";

    // First api call, used to get data to trigger second api call (the one that
    // returns the actual weather data)
    $.ajax({
        url: queryGeoURL,
        method: "GET"
    })
    .then(function(response) {
        let lat = response[0].lat;            
        let lon = response[0].lon;

        // Api endpoint that returns current weather
        let queryWeatherURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid=3b515d44aff736d8b6cbd98468bd1dfb";

        // Ajax api call that returns current weather data
        $.ajax({
            url: queryWeatherURL,
            method: "GET"
        })
        .then(function(response) {
            console.log(response);

            let currentDay = moment().format("DD/M/YYYY");
            let currentTemp = response.main.temp;

        });
    }); 
    

    // EVENTS API CALL
    let queryEventURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city="+city+"&startDateTime="+yesterdayDate+"T00:00:00Z&sort=date,name,asc&apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"
    
    $.ajax({
        url: queryEventURL,
        method: "GET"
    })
    .then(function(response) {
        // console.log(response);
        let eventsArray = response._embedded.events;        

        for (let i = 0; i < eventsArray.length; i++) {
            let event = {
                name: eventsArray[i].name,
                date: eventsArray[i].dates.start.localDate,
                link: eventsArray[i].url
            }
            eventsObject.push(event);
        }
        // console.log(eventsObject);            
        populateEventDiv(eventsObject);
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