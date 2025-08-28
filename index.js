const search = document.querySelector('.search');
const searchBtn = document.querySelector('.searchBtn')
const apiKey = `8779eb9a2f944c978bf44401252708`;
const temp = document.querySelector('.temp');
const place = document.querySelector('.place');
const wind = document.querySelector('.windSpeed');
const humid = document.querySelector('.humid');
const skyImage = document.querySelector('.skyImg');
const message = document.querySelector('.msg');


const noInput = ()=>{
        temp.innerHTML = `--°C`;
        place.innerHTML =  `--`;
        wind.innerHTML = `--kph`;
        humid.innerHTML = `--%`;
}


const getValue = async ()=>{
    
    message.style.display = 'none';
    const city = search.value.trim();
    // let city = searchData;
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    if (city) {
        let weatherData = await apiCall(apiUrl);
        const data = {
            heat : weatherData.current.temp_c,
            cityName : weatherData.location.name,
            windSpeed : weatherData.current.wind_kph,
            humidData : weatherData.current.humidity,
            skyData : weatherData.current.condition.text.toLowerCase(),
        };
        temp.innerHTML = `${data.heat}°C`;
        place.innerHTML =  `${data.cityName}`;
        wind.innerHTML = `${data.windSpeed}kph`;
        humid.innerHTML = `${data.humidData}%`;
        // console.log(data.skyData);
//Cloudy, Partly Cloudy, Overcast, Sunny, Clear, Patchy light drizzle, Light drizzle, Patchy light rain, Light rain, Heavy rain
//Patchy light snow, Light snow , Patchy moderate snow  , Moderate snow, Patchy heavy snow, Heavy snow, Light snow showers
        const cloudySkies = ['cloudy', 'partly cloudy', 'overcast'];
        const clearSkies = [ 'clear', 'sunny'];
        const drizzle = ['patchy light drizzle','light drizzle'];
        const rain = ['patch light rain', 'light rain', 'heavy rain'];
        const snow = ['patchy light snow', 'light snow', 'moderate snow', 'heavy snow'];

        if (cloudySkies.includes(data.skyData)){
            skyImage.src= "./images/clouds.png";

        } else if (clearSkies.includes(data.skyData)) {
            skyImage.src = "./images/clear.png";

        } else if (drizzle.includes(data.skyData)) {
            skyImage.src = './images/drizzle.png';

        } else if (rain.includes(data.skyData)){
            skyImage.src = './images/rain.png';

        } else if (snow.includes(data.skyData)){
            skyImage.src = './imgaes/snow.png';

        } else {
            skyImage.src = "./images/mist.png";
        }

    } else {
        noInput();
        // console.log(data.skyData);
        message.innerHTML = 'Please enter city name'
        message.style.display = 'block';

    }
    search.value = '';
    search.focus();
}

searchBtn.addEventListener('click', getValue)
search.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        getValue();
    }
}
    
)

const apiCall = async (apiUrl) =>{
    
    const response = await fetch(apiUrl)
    const data = await response.json();
    
    if (!response.ok){
        noInput();
        message.innerHTML = 'Enter a valid city name';
        message.style.display = 'block';

    } else {
        return data;
    }    
    
}
















// const btn = document.querySelector('button')
// btn.setAttribute('title','search')
// https://api.open-meteo.com/v1/forecast?latitude=13.0878&longitude=80.2785&hourly=temperature_2m
// city = 'london';

// const cloudySkies = ['Cloudy', 'Partly Cloudy'];

// if (cloudySkies.map(s => s.toLowerCase()).includes(data.skyData.toLowerCase())) {
//     skyImage.src = "./images/clouds.png";
// }
