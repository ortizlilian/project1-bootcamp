let queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?apikey=XyowdfVyO9oj0crWA29ukrAYd3lUxIdS"

$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log(response);
});


let queryExcuserOffice = "https://excuser-three.vercel.app/v1/excuse/office"

$.ajax({
    url: queryExcuserOffice,
    method: "GET"
})
.then(function(response) {
    console.log(response);
});

let queryExcuserFamily = "https://excuser-three.vercel.app/v1/excuse/family"

$.ajax({
    url: queryExcuserFamily,
    method: "GET"
})
.then(function(response) {
    console.log(response);
});

let queryExcuserChildren = "https://excuser-three.vercel.app/v1/excuse/children"

$.ajax({
    url: queryExcuserChildren,
    method: "GET"
})
.then(function(response) {
    console.log(response);
});