const apiKey = "20da423906ccf27bec8c2d81c8f4a2eb"

const weatherDataEle = document.querySelector(".weather-data")
const cityNameEle = document.querySelector("#city-name")
const formEle = document.querySelector("form")
const imgIcon = document.querySelector(".icon")
const citySuggestions = document.getElementById('city-suggestions')

const cities = [
    'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
    'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
    'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad',
    'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli',
    'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
    'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur',
    'Gwalior', 'Vijayawada', 'Jodhpur', 'Madurai', 'Raipur', 'Kota', 'Guwahati',
    'Chandigarh', 'Solapur', 'Hubli-Dharwad', 'Bareilly', 'Moradabad', 'Mysore',
    'Gurgaon', 'Aligarh', 'Jalandhar', 'Tiruchirappalli', 'Bhubaneswar', 'Salem',
    'Mira-Bhayandar', 'Thiruvananthapuram', 'Bhiwandi', 'Saharanpur', 'Guntur',
    'Amravati', 'Bikaner', 'Noida', 'Jamshedpur', 'Bhilai', 'Cuttack', 'Firozabad',
    'Kochi', 'Bhavnagar', 'Dehradun', 'Durgapur', 'Asansol', 'Nanded', 'Kolhapur',
    'Ajmer', 'Gulbarga', 'Jamnagar', 'Ujjain', 'Loni', 'Siliguri', 'Jhansi',
    'Ulhasnagar', 'Jammu', 'Sangli-Miraj & Kupwad', 'Mangalore', 'Erode', 'Belgaum',
    'Ambattur', 'Tirunelveli', 'Malegaon', 'Gaya', 'Udaipur', 'Kakinada', 'Davanagere',
    'Kozhikode', 'Akola', 'Kurnool', 'Bokaro Steel City', 'Bellary', 'Patiala',
    'Gopalpur', 'Agartala', 'Bhagalpur', 'Muzaffarnagar', 'Bhatpara', 'Panipat',
    'Latur', 'Dhule', 'Rohtak', 'Korba', 'Bhilwara', 'Brahmapur', 'Muzaffarpur'
];

document.addEventListener('DOMContentLoaded', () => {
    cityNameEle.addEventListener('input', () => {
        const input = cityNameEle.value.toLowerCase();
        citySuggestions.innerHTML = '';

        const filteredCities = cities.filter(city => city.toLowerCase().includes(input));
        filteredCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            citySuggestions.appendChild(option);
        });
    });
});

formEle.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityValue = cityNameEle.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response is not ok!");
        }

        const data = await response.json();
        const temprature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataEle.querySelector(".temp").textContent = `${temprature}°C`;
        weatherDataEle.querySelector(".desc").textContent = `${description}`;

        imgIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="">`;

        weatherDataEle.querySelector(".details").innerHTML = details.map((detail) => {
            return `<div>${detail}</div>`;
        }).join("");

    } catch (err) {
        weatherDataEle.querySelector(".temp").textContent = "";
        imgIcon.innerHTML = "";
        weatherDataEle.querySelector(".desc").textContent = "An Error Occurred!";
    }
}
