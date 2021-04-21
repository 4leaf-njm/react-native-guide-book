const API_KEY = 'faa4512d2d4f3d6e504d9a594d0d2128';

const fetchForecast = zip => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${zip}&units=metric&APPID=${API_KEY}`;

  return fetch(url)
    .then(response => response.json())
    .then(response => {
      return {
        main: response.weather[0].main,
        description: response.weather[0].description,
        temp: response.main.temp,
      };
    })
    .catch(error => {
      console.log(error);
    });
};

export default { fetchForecast: fetchForecast };
