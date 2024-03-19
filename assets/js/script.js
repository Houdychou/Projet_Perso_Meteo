const apiKey = 'cf79a8b955dcf72f938b8fcedead8188';
const city = 'Marrakech';
function nameOfDays() {
    let date = new Date();
    let numeroJour = date.getDay();
    let joursSemaine = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let nomJour = joursSemaine[numeroJour];
    return nomJour;
}
function meteoFetch() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        const location = document.querySelector('.location');
        const rain = document.querySelector('.rain');
        const temp = document.querySelector('.temp');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');
        const tempCelsius = data.main.temp - 273.15;
        console.log(nameOfDays())
        location.textContent = data.name + ', ' + data.sys.country;
        temp.textContent =  + tempCelsius.toFixed(0) + '°C';
        humidity.textContent = 'humidity : ' + data.main.humidity + '%';
        wind.textContent = 'Wind : ' + data.wind.speed + 'km/h';
    })
    .catch(function(error) {
        console.log(error);
    })
}
meteoFetch();