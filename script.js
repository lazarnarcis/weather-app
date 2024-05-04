let button = document.querySelector("button");
let dataHTML = document.querySelector("#dataHTML");
let apiErr = "<b>Adresa pe care ai introdus-o nu este corecta sau avem o problema cu API-ul!</b>";

button.addEventListener("click", function() {
    dataHTML.innerHTML = "Se incarca...";
    let locName = document.querySelector("#locationName");
    let cityName = locName.value;
    let limit = 5;
    let apiKey = "ec422617e09e98f3e305edf89e599ffc";
    let api = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=" + limit + "&appid=" + apiKey;
    fetch(api).then(res => res.json()).then(res => {
        console.log(res);
        let lat = res[0].lat;
        let lon = res[0].lon;
        let newApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        fetch(newApi).then(res1 => res1.json()).then(res1 => {
            dataHTML.innerHTML = "";
            console.log(res1);
            let kelvin = Math.floor(res1.main.temp_max);
            
            let locationName = document.createElement("p");
            locationName.innerHTML = "<h1>Vremea in <b>" + res[0].name + ", " + res[0].country + "</b></h1>";
            dataHTML.appendChild(locationName);
            
            let celsius = Math.floor(kelvin - 273.15);
            let htmlCelsius = document.createElement("p");
            htmlCelsius.innerHTML = celsius + " de grade Celsius";
            dataHTML.appendChild(htmlCelsius);
            
            let fahrenheit = Math.floor((celsius * 9/5) + 32);
            let htmlFahrenheit = document.createElement("p");
            htmlFahrenheit.innerHTML = fahrenheit + " de grade Fahrenheit";
            dataHTML.appendChild(htmlFahrenheit);
            
            let descriptionWeather = res1.weather[0].description;
            let descHTML = document.createElement("p");
            descHTML.innerHTML = "<i>" + descriptionWeather + "</i>";
            dataHTML.appendChild(descHTML);

            let humidity = res1.main.humidity;
            let humHTML = document.createElement("p");
            humHTML.innerHTML = "Umiditatea: " + humidity + "%";
            dataHTML.appendChild(humHTML);
            
            var rasaritDate = new Date(res1.sys.sunrise * 1000);
            let rasarit = rasaritDate.toUTCString();
            let rasaritHTML = document.createElement("p");
            rasaritHTML.innerHTML = "Rasarit: " + rasarit;
            dataHTML.appendChild(rasaritHTML);
            
            var apusDate = new Date(res1.sys.sunset * 1000);
            let apus = apusDate.toUTCString();
            let apusHTML = document.createElement("p");
            apusHTML.innerHTML = "Apus: " + apus;
            dataHTML.appendChild(apusHTML);

            let text = "";
            if (celsius > 15) {
                text = "Este destul de cald! (15+ grade Celsius)";
            } else if (celsius > 30) {
                text = "Este foarte cald! (peste 30 grade Celsius)";
            } else if (celsius <= 15 && celsius >= 0) {
                text = "Este acceptabil! (0-15 grade celsius)";
            } else {
                text = "Este frig - ai nevoie de o geaca! (sub 10 grade Celsius)";
            }

            if (humidity > 45) {
                text += "<br>Ai nevoie si de o umbrela pentru ca e posibil sa ploua!";
            }
            
            let finalHTML = document.createElement("p");
            finalHTML.innerHTML = text;
            dataHTML.appendChild(finalHTML);
        }).catch(err => {
            dataHTML.innerHTML = apiErr;
        });
    }).catch(err => {
        dataHTML.innerHTML = apiErr;
    });
});
