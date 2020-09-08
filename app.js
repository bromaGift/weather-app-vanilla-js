window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".loction-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=48ea13dce4ea18eb8644a93b6600cc4c`;
        
            fetch(api)
            .then(response =>{ 
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];

                //set DOM elements from the api
                temperatureDegree.textContent = temp;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name;

                //formula for celcius
               let fahrenheit = (temp * (9/5)) + 32;

                //change temp to celcius/fahrenheit
                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = temp;
                    } else {temperatureSpan.textContent = "F";
                     temperatureDegree.textContent = Math.floor(fahrenheit);
                    }
                })
                 });
        });
    }
});