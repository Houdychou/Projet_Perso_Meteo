const apiKey = 'cf79a8b955dcf72f938b8fcedead8188';
const cityInput = document.querySelector('input');
const main = document.querySelector('main');
const footer = document.querySelector('footer');
const headerImg = document.querySelector('header img');
const date = document.querySelector('.date');
const erreur = document.querySelector('.error');
const tempMax = document.querySelectorAll('.temp-max');
const tempMin = document.querySelectorAll('.temp-min');
const locationElement = document.querySelector('.location'); 

function nameOfDays() {
    let date = new Date();
    let numeroJour = date.getDay();
    let joursSemaine = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let nomJour = joursSemaine[numeroJour];
    return nomJour + ', ' + date.getDate() + 'th';
}

function meteoFetch(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey)
    .then(function(res) {
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        const location = document.querySelector('.location');
        const temp = document.querySelector('.temp');
        const humidity = document.querySelector('.humidity');
        const wind = document.querySelector('.wind');
        const tempCelsius = data.main.temp - 273.15;
        date.textContent = nameOfDays();
        location.textContent = data.name + ', ' + data.sys.country;
        temp.textContent = tempCelsius.toFixed(0) + '°C';
        humidity.textContent = 'humidity : ' + data.main.humidity + '%';
        wind.textContent = 'Wind : ' + data.wind.speed + 'km/h';
    })
    .catch(function(error) {
        console.log(error);
        erreur.classList.remove('hidden');
        main.classList.add('hidden');
        footer.classList.add('hidden');
        date.classList.add('hidden');
        headerImg.classList.add('hidden')
        locationElement.classList.add('hidden');
    })
}

function meteoForecast(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.list.length; i++) {
                for (let j = 0; j < tempMax.length; j++) {
                    const temperature = data.list[i].main.temp_max - 273.15;
                    tempMax[i].textContent = temperature.toFixed(0) + "°c";
                    const temperatureMin = data.list[i].main.temp_min - 280.15;
                    tempMin[i].textContent = temperatureMin.toFixed(0) + "°c";
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

cityInput.addEventListener('input', function (event) {
    if (event.target.value.trim() === "") {
        main.classList.add('hidden');
        footer.classList.add('hidden');
        date.classList.add('hidden');
        headerImg.classList.add('hidden');
        locationElement.classList.add('hidden');
    } else {
        erreur.classList.add('hidden');
    }
});

cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim(); 
        if (city !== "") {
            main.classList.remove('hidden');
            footer.classList.remove('hidden');
            date.classList.remove('hidden');
            headerImg.classList.remove('hidden');
            locationElement.classList.remove('hidden');
            meteoFetch(city);
            meteoForecast(city);
            erreur.classList.add('hidden');
        } else {
            main.classList.add('hidden');
            footer.classList.add('hidden');
            date.classList.add('hidden');
            headerImg.classList.add('hidden');
            locationElement.classList.add('hidden');
            erreur.classList.remove('hidden');
        }
    }
});
