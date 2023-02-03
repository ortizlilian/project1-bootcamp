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
            <a class="events-links" target="_blank" href=${array[i].link}>
                <div class="row events-tiles">
                    <div class="col-2">
                        <p>${moment(array[i].date, 'YYYY-MM-DD').format('Do')}</p>
                        <p>${moment(array[i].date, 'YYYY-MM-DD').format('MMM')}</p>
                    </div>
                    <div class="col-10">
                        <p>${array[i].name}</p>
                    </div>
                </div>
            </a>              
        `);
        $('#eventsContainer').append(eventDiv);
    }
}

function populateWeatherDiv(city, date, temp, weather) {
    $('#weatherContainer').empty();

    let weatherDiv = $(`
        <div class="weather-tile row" style="background-color: red; display: flex-end">
            <p>${city}</p>
            <p>${date}</p>            
            <img src="http://openweathermap.org/img/wn/${weather}@4x.png" alt="Weather Icon" width="50px" height="50px">
            <p>${parseInt(temp)}°C</p>
        </div>
    `);
    $('#weatherContainer').append(weatherDiv);
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

            let date = moment().format("Do MMMM");
            let temp = response.main.temp;
            let weather = response.weather[0].icon;

            populateWeatherDiv(city, date, temp, weather);

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