const apiKey = 'cf79a8b955dcf72f938b8fcedead8188';
const cityInput = document.querySelector('input')

function nameOfDays() {
    let date = new Date();
    let numeroJour = date.getDay();
    let joursSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let nomJour = joursSemaine[numeroJour];
    return nomJour + ', ' + date.getDate();
}
function meteoFetch(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        const location = document.querySelector('.location');
        const date = document.querySelector('.date');
        const rain = document.querySelector('.rain');
        const temp = document.querySelector('.temp');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');
        const tempCelsius = data.main.temp - 274.15;

        location.textContent = data.name + ', ' + data.sys.country;
        date.textContent = nameOfDays();
        temp.textContent =  + tempCelsius.toFixed(0) + '°C';
        humidity.textContent = 'humidity : ' + data.main.humidity + '%';
        wind.textContent = 'Wind : ' + data.wind.speed + 'km/h';
    })
    .catch(function(error) {
        console.log(error);
    })
}

cityInput.addEventListener('keydown', function(event){
    if(event.key === 'Enter'){
        meteoFetch(cityInput.value);
    }
})