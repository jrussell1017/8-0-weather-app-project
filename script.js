

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

         
                                    
         
        }).catch((err) =>  {
    
        })

})