import { getCountryName } from '../modules/countries.js';
var key = '8f657d4bd948c3e6c1aeef5fa5210115';

function weatherBalloon( city = 'Yaounde' ) {
    let endPoint = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key;
    fetch(endPoint)  
    .then( res => { 
        return res.json() 
    }) 
    .then(data => {
      // console.log(data);
        updateDom(data);
    })
    .catch( err => {
      // catch any errors
      console.log("Fetch Error: ", err);
    });
}
  
// browser refresh
window.addEventListener("DOMContentLoaded", () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    // using cities names to search weather information
     weatherBalloon('Bamenda');
})


function showPosition(position) {
    const [lat, lon] = [position.coords.longitude, position.coords.latitude];
    // console.log(lon);
    const coordsEndpoint = 
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

    fetch(coordsEndpoint).then(result => result.json())
        .then(data => updateDom(data))
        .catch(error => console.log(error));
}

const updateDom = (data) => {
    let celcius = Math.round(parseFloat(data.main.temp)-273.15);
    let fahrenheit = Math.round(((parseFloat(data.main.temp)-273.15)*1.8)+32); 

    // console.log(celcius);
    // console.log(fahrenheit);
   
    document.getElementById('icon').innerHTML =  `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="Weather Icon">`;
	document.getElementById('description').innerHTML = data.weather[0].description;
	document.getElementById('temp').innerHTML = celcius + '&deg; C ' + " | " + fahrenheit + '&deg; F';
    // get humidity, presure, sea-level, ground-level
    document.getElementById('humidity').innerHTML = data.main.humidity + ' %';
    document.getElementById('pressure').innerHTML = data.main.pressure + ' hPa';
    
    if(data.main.sea_level === undefined && data.main.grnd_level === undefined ) {
        // document.getElementById('remove').classList.remove('optional');
        // document.getElementById('throw').classList.remove('optional');
        let className = document.getElementsByClassName('optional');
        for(let i=0; i<className.length; i++) {
            if(className[i].style.display === "none") {
                className[i].style.display = "block";
            }
            else {
                className[i].style.display = "none";
            }
        }
        
        document.getElementById('seaLevel').innerHTML = "";
        document.getElementById('groundLevel').innerHTML ="";
    }
    else {
        document.getElementById('seaLevel').innerHTML = data.main.sea_level + ' hPa';
        document.getElementById('groundLevel').innerHTML = data.main.grnd_level + ' hPa';
    }
    //make use of our module
    let countryCode = data.sys.country;
    //getCountryName recieves countryCode as parameter and returns the CountryName
    let countryName = getCountryName(countryCode);
    document.getElementById('location').innerHTML = data.name + ",  " + countryName;
}

// get userInput from the search bar
let input =  document.querySelector('#search');
input.addEventListener('keyup', event => {
   if(event.key === "Enter") {
       const city = event.target.value;
    //    console.log(city);
        let endPoint ='https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key;
        weatherBalloon(city);

   }
    
});
