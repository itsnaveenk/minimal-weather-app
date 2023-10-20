// openweather api key = b2aecd1c75373e22cab2d50d8b323af0

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchbtn');
const weather_img= document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const city_name= document.querySelector('.city-name');
const feels_like= document.getElementById('feels-like');
const pressure= document.getElementById('pressure');

const not_found = document.querySelector('.notfound');

const weather_body = document.querySelector('.weather-body');


// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

async function checkWeather(city){

    const apikey = "b2aecd1c75373e22cab2d50d8b323af0"; // enter your api key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404'){
        not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Invalid, Please enter city name correctly");
        
        return;
    }else{
    weather_body.style.display = "flex";
    not_found.style.display = "none";
    }
    temp.innerHTML=`${Math.round(weather_data.main.temp - 273.15)}°C`;
    desc.innerHTML=`${weather_data.weather[0].description}`;
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind.innerHTML=`${weather_data.wind.speed}Km/H`;
    city_name.innerHTML=`${weather_data.name},${weather_data.sys.country}`;
    feels_like.innerHTML=`${Math.round(weather_data.main.feels_like - 273.15)}°C`;
    pressure.innerHTML=`${weather_data.main.pressure}hPa`;
    
    const icon = `${weather_data.weather[0]['icon']}`;
    weather_img.src = `./img/${icon}.svg`.replace('$%7Bicon%7D', icon);    



    console.log(weather_data);
}

searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value)
});
