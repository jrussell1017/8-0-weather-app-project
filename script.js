

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
           
         
        }).catch((err) =>  {
    
        })

})