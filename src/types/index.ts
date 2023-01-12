export type WeatherResponse = {
  city: string;
  country: string;
  lat: number;
  lon: number;
  tempCelcius: number;
  tempFahrenheit: number;
  weather: string;
  humidity: number;
  windSpeed: number;
  weatherDescription: string;
  weatherLogo: string;
  displayTime: string;
  searchStatus: any;
  isSearching: boolean;
  forecast: any;
  loaded: true;
};
