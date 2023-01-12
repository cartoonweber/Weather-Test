/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getWeather } from "./async/getWeather";
import { useAppDispatch } from "./hooks/hooks";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import { Header } from "./components/Header";

export type Coords = {
  latitude: number;
  longitude: number;
};

type Location = {
  coords: Coords;
  timestamp: number;
};

const countryCodeEndpoint = "https://raw.githubusercontent.com/jgudo/react-weather-app/master/static/country-code.json";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = React.useState<boolean>(true);
  const [countryCodes, setCountryCodes] = React.useState([]);

  async function fetchCountryList() {
    try {
      const requestCountryCode = await fetch(countryCodeEndpoint);
      const countryCode = await requestCountryCode.json();
      setCountryCodes(countryCode);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWeatherByIP() {
    const ipdataApiKey = "2efa6ba99cac072c204b5778b85b65b3df711edd1db8682afbfb4f01";
    const ipdataEndpoint = `https://api.ipdata.co/?api-key=${ipdataApiKey}`;
    const requestLocation = await fetch(ipdataEndpoint);
    const location = await requestLocation.json();

    dispatch(getWeather(location));
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response: Location) => {
        dispatch(getWeather(response.coords));
      },
      (error: any) => {
        fetchWeatherByIP();
      }
    );
    fetchCountryList();
  }, []);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme ? "#101827" : "#DDDDDD";
  }, [theme]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} countryCodes={countryCodes} />} />

        <Route path="/history" element={<History theme={theme} />} />
      </Routes>
    </>
  );
};

export default App;
