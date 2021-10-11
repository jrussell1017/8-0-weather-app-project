// selects for
let form = document.querySelector("form#weather-input");

// adds event listener to for on submit
form.addEventListener("submit", (e) => {
  // prevents page js from running on load
  e.preventDefault();

  // sets user input to what user typed in
  let userInput = e.target["zip-input"].value;
  // sets city to user input uppercasing first letter and adding back the rest of the word
  let city = userInput[0].toUpperCase() + userInput.slice(1);

  // resets the form after the user submits
  e.target.reset();
  // calling helper function and setting second parameter to true
  getWeatherData(city, true);
});

// helper function to fetch weather data from API and build display dynamically
function getWeatherData(city, shouldIAddToRecents) {
  fetch(`https://wttr.in/${city}?format=j1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      // display
      let areaName = data.nearest_area[0].areaName[0].value;
      let regionName = data.nearest_area[0].region[0].value;
      let countryName = data.nearest_area[0].country[0].value;
      let feelsLike = data.current_condition[0].FeelsLikeF;

      // current and future forcast
      let todaysAvg = data.weather[0].avgtempF;
      let todaysMaxTemp = data.weather[0].maxtempF;
      let todaysMinTemp = data.weather[0].mintempF;

      let tomorrowAvg = data.weather[1].avgtempF;
      let tomorrowMaxTemp = data.weather[1].maxtempF;
      let tomorrowMinTemp = data.weather[1].mintempF;

      let dayAfterAvg = data.weather[2].avgtempF;
      let dayAfterMaxTemp = data.weather[2].maxtempF;
      let dayAfterMinTemp = data.weather[2].mintempF;

      // display template literal

      let display = document.querySelector(".display");

      display.innerHTML = `<div id="color-container">
      <h2>${areaName}</h2>
      <div><strong>Area:</strong> ${areaName}</div>
      <div><strong>Region:</strong> ${regionName}</div>
      <div><strong>Country:</strong> ${countryName}</div>
      <div><strong>Currently:</strong> Feels Like: ${feelsLike}˚F</div>
        </div>
        
      <div class="future-forcast">
      <div id="todays-temp">
      
      </div>
      
      <div id="tomorrows-temp">
      
      </div> 
      
      <div id="day-after-temp">
      
      </div>
      
      </div>`;

      // today template
      let todaysSelector = document.querySelector("#todays-temp");
      todaysSelector.innerHTML = `<h3>Today</h3>
      <div class="average"><strong>Average Temperature:</strong> ${todaysAvg}</div>
      <div class="max-temp"><strong>Max Temperature:</strong> ${todaysMaxTemp}</div>
      <div class="min-temp"><strong>Min Temperature:</strong> ${todaysMinTemp}</div>`;
      //tomorrow template
      let tomorrowSelector = document.querySelector("#tomorrows-temp");
      tomorrowSelector.innerHTML = `<h3>Tomorrow</h3>
      <div class="average"><strong>Average Temperature:</strong> ${tomorrowAvg}</div>
      <div class="max-temp"><strong>Max Temperature:</strong> ${tomorrowMaxTemp}</div>
      <div class="min-temp"><strong>Min Temperature:</strong> ${tomorrowMinTemp}</div>`;
      // day after template
      let dayAfterSelector = document.querySelector("#day-after-temp");
      dayAfterSelector.innerHTML = `<h3>Day After</h3>
      <div class="average"><strong>Average Temperature:</strong> ${dayAfterAvg}</div>
      <div class="max-temp"><strong>Max Temperature:</strong> ${dayAfterMaxTemp}</div>
      <div class="min-temp"><strong>Min Temperature:</strong> ${dayAfterMinTemp}</div>`;

      if (shouldIAddToRecents) {
        addToPrevious(city, feelsLike);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// helper function to create dynamic sidebar
function addToPrevious(selectedCity, currentTemp) {
  // recent searches
  // must have area name and current temp
  // area name must be an anchor tag

  let recent = document.querySelector("#recent");

  if (recent) recent.remove();
  let ul = document.querySelector(".history ul");
  let li = document.createElement("li");
  let a = document.createElement("a");
  let strong = document.createElement("strong");

  a.textContent = selectedCity;
  a.setAttribute("href", "#");
  li.textContent += ` - ${currentTemp}°F`;

  li.prepend(a);
  ul.append(li);

  a.addEventListener("click", (event) => {
    getWeatherData(event.target.textContent, false);
  });
}
