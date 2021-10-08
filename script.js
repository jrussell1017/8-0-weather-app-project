

let form = document.querySelector("form#weather-input")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let userInput = e.target["zip-input"].value

    let URL = 
    `https://wttr.in/${userInput}?format=j1`


    fetch(URL)
        .then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            // display
          let areaName = data.nearest_area[0].areaName[0].value
          let regionName = data.nearest_area[0].region[0].value
          let countryName = data.nearest_area[0].country[0].value
          let feelsLike = data.current_condition[0].FeelsLikeF

          // current and future forcast
          let todaysAvg = data.weather[0].avgtempF
          let todaysMaxTemp = data.weather[0].maxtempF
          let todaysMinTemp = data.weather[0].mintempF

          let tomorrowAvg = data.weather[1].avgtempF
          let tomorrowMaxTemp = data.weather[1].maxtempF
          let tomorrowMinTemp = data.weather[1].mintempF

          let dayAfterAvg = data.weather[2].avgtempF
          let dayAfterMaxTemp = data.weather[2].maxtempF
          let dayAfterMinTemp = data.weather[2].mintempF

          // display template literal

        let display = document.querySelector(".display")

        display.innerHTML = 
                              `<h2>${areaName}</h2>
                              <div>Area: ${areaName}</div>
                              <div>Region: ${regionName}</div>
                              <div>Country: ${countryName}</div>
                              <div>Currently: Feels Like: ${feelsLike}˚F</div>
                              
                              <div class="future-forcast">
                              <div id="todays-temp">
                                 
                              </div>
          
                              <div id="tomorrows-temp">
                                  
                              </div> 
          
                              <div id="day-after-temp">
                                 
                              </div>
                              
                          </div>`

          // today template
          let todaysSelector = document.querySelector("#todays-temp")
          todaysSelector.innerHTML = 
                                      `<h3>Today</h3>
                                      <div class="average">Average Temperature: ${todaysAvg}</div>
                                      <div class="max-temp">Max Temperature: ${todaysMaxTemp}</div>
                                      <div class="min-temp">Min Temperature: ${todaysMinTemp}</div>`
          //tomorrow template
          let tomorrowSelector = document.querySelector("#tomorrows-temp")
          tomorrowSelector.innerHTML = 
                                          `<h3>Tomorrow</h3>
                                          <div class="average">Average Temperature: ${tomorrowAvg}</div>
                                          <div class="max-temp">Max Temperature: ${tomorrowMaxTemp}</div>
                                          <div class="min-temp">Min Temperature: ${tomorrowMinTemp}</div>`
          // day after template
          let dayAfterSelector = document.querySelector("#day-after-temp")
          dayAfterSelector.innerHTML = 
                                          `<h3>Day After</h3>
                                          <div class="average">Average Temperature: ${dayAfterAvg}</div>
                                          <div class="max-temp">Max Temperature: ${dayAfterMaxTemp}</div>
                                          <div class="min-temp">Min Temperature: ${dayAfterMinTemp}</div>`


                                // recent searches
          // must have area name and current temp

          let recent = document.querySelector("#recent")
          
          if(recent) recent.remove() 
          let ul = document.querySelector(".history ul")
          let li = document.createElement("li")

          li.textContent = `${userInput} - ${feelsLike}°F`
          ul.append(li)
         
        

        }).catch((err) =>  {
            console.log(err)
        })

})