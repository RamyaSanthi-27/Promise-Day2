var res = fetch("https://restcountries.com/v2/all");
res.then((data) => data.json()).then((data1) => {

    var container = document.createElement("div");
    container.setAttribute("class", "container");

    var row = document.createElement("div");
    row.setAttribute("class", "row");

    for (var i = 0; i < data1.length; i++) {
        var restCountryName = data1[i].name;
        console.log(restCountryName);
        var col = document.createElement("div");
        col.setAttribute("class", "col-lg-4 col-sm-12");

        col.innerHTML = `
        <div class="card" style="width: 18rem;">
          <h5 class="card-header">${restCountryName}</h5>
          <img src="${data1[i].flag}" class="card-img-top" alt="">
          <h3 class="card-body">Capital : ${data1[i].capital}</h3>
          <h3 class="card-body">Region : ${data1[i].region}</h3>
          <h3 class="card-body">Lat and Lng : ${data1[i].latlng}</h3>
          <h3 class="card-body">Country Codes : ${data1[i].alpha3Code}</h3>
          <button class="btn btn-primary" onclick="getWeatherData('${restCountryName}')">Click for Weather</button>
        </div> `;

        row.append(col);
        container.append(row);
        document.body.append(container);
    }
});

function getWeatherData(restCountryName) {
    // Use restCountryName in your fetch request to get weather data.
    // Example:
    var apiKey = "eebfc7ad50c4a39e555028ff4aee7c38";
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${restCountryName}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then((response) => response.json())
        .then((weatherData) => {
            var weatherCountryName = weatherData.name;

            if (weatherCountryName === restCountryName) {
              alert(`Weather in ${weatherData.name}: ${weatherData.main.temp_min} min:deg&c && ${weatherData.main.temp_max} max:deg&c`);
            } else {
                alert("Country names do not match.");
            }
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert`Error fetching weather data.`;
        });
}