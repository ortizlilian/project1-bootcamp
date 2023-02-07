let city = '';
let eventsObject = [];
let yesterdayDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
let cityArray = [];

function start() {
    cityArray = JSON.parse(localStorage.getItem('cityArray')) || [];
    createCitiesShortcuts(cityArray);
}

function createCitiesShortcuts(array) {
    $('.dropdown-menu').empty();

    array.forEach(element => {
        $('.dropdown-menu').append(`
        <a class="dropdown-item cities-call">${element}</a>
        <div class="dropdown-divider"></div>
        `);
    });

    $("a.cities-call").on("click", function(event) {
        event.preventDefault();
        let click = $(this)[0].innerText;

        $('#cityInput, #cityInput2').val(click);
        $('#searchBtn, #searchBtn2').trigger("click");
        $('#cityInput, #cityInput2').val('');
    });
}

function storeCity(city) {
    if (city != '' && cityArray.includes(city) != true) {        
        cityArray.push(city); 
        localStorage.setItem('cityArray', JSON.stringify(cityArray));
        createCitiesShortcuts(cityArray);
    }
}

function populateWeatherDiv(city, day, month, temp, weather) { 
    let weatherDiv = $(`
        <div class="weather-tile" style="background-color: red; display: flex; justify-content: space-around; padding: 5rem;" width="100%" height="fit-content">
            <p>${city}</p>
            <div>
                <p>${day}</p>
                <p>${month}</p>
            </div>            
            <img src="http://openweathermap.org/img/wn/${weather}@4x.png" alt="Weather Icon" width="50px" height="50px">
            <p>${parseInt(temp)}°C</p>
        </div>
    `);
    $('#jumbotron').replaceWith(weatherDiv);
    $('.weather-tile').replaceWith(weatherDiv);
}

function populateEventDiv(array) {    

    $('#eventsContainer').append(`<p>What's on today</p>`);

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

    let moreButton = $(`
        <div class="row">
        <a class="events-links" target="_blank" href="https://www.ticketmaster.co.uk/search?q=${city}">MORE</a>
        </div>
    `);
    $('#eventsContainer').append(moreButton);
}

function populateExcuseDiv(array) {
    $('#excusesContainer').empty();
    let containerTitle = $(`
        <p>Need to get away from someone?</p>
        <p>Give them a excuse 😉</p>
    `);
    let excuseDiv = $(`           
        <p>${array[0].excuse}</p>           
    `);
    $('#excusesContainer').append(containerTitle, excuseDiv);
}

function eventsApiCall(city, yesterdayDate) {
  
    // EVENTS API CALL
    let queryEventURL = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&city="+city+"&startDateTime="+yesterdayDate+"T00:00:00Z&sort=date,name,asc&apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"
    
    $.ajax({
        url: queryEventURL,
        method: "GET"
    })
    .then(function(response) {
        
        if (response.page.totalElements == 0) {

            $('#eventsContainer').empty();
            eventsObject = [];
            $('#eventsContainer').append(`<p>No events for this city <br> Try another one 😊</p>`);

        } else {

            let eventsArray = response._embedded.events;
            eventsObject = [];       

                for (let i = 0; i < eventsArray.length; i++) {
                    let event = {
                        name: eventsArray[i].name,
                        date: eventsArray[i].dates.start.localDate,
                        link: eventsArray[i].url
                    }
                    eventsObject.push(event);
                }            
        }
        
        populateEventDiv(eventsObject);
    });
}

function excuserApiCall() {
    // EXCUSER API CALL
    let queryExcuser = "https://excuser-three.vercel.app/v1/excuse"

    $.ajax({
        url: queryExcuser,
        method: "GET"
    })
    .then(function(response) {
        populateExcuseDiv(response);
    });
}    

$('#searchBtn, #searchBtn2').on('click', function(event) {
    event.preventDefault();
    
    city = $('#cityInput').val() == undefined ? $('#cityInput2').val() : $('#cityInput').val();
    if (city.length <= 3) {
        return false;
    }

    storeCity(city);

    $(".formulario-top").removeClass("d-none");
    $('#eventsContainer').empty();

    // WEATHER API CALL
    let queryGeoURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=5&appid=3b515d44aff736d8b6cbd98468bd1dfb";

    // First api call, used to get data to trigger second api call (the one that
    // returns the actual weather data)
    $.ajax({
        url: queryGeoURL,
        method: "GET",
        statusCode: {
            400: function() {
                console.log("bad request", "This is the input: "+ queryGeoURL);
            }
        },
        success: function(response) {     

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
    
                let day = moment().format("Do");
                let month = moment().format("MMM");
                let temp = response.main.temp;
                let weather = response.weather[0].icon;
    
                populateWeatherDiv(city, day, month, temp, weather);
                eventsApiCall(city, yesterdayDate);
                excuserApiCall();                
    
            });
        }
    });
});

// JUMBOTRON BACKGROUND IMAGE
let i = 0;
let images = [
    "imgs/concert1.jpg",
    "imgs/concert2.jpg",
    "imgs/theater1.jpg",
    "imgs/theater2.jpg",
    "imgs/conference1.jpg",
    "imgs/conference2.jpg"
];

// Change the image
function changeImg() {
    $('.jumbotron').css({
                        "background-image": "url(" + images[i] + ")",
                        "transition": "2s"
                        });

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    setTimeout("changeImg()", 3000);
}

window.onload = changeImg;

start();