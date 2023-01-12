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


const countryCodeEndpoint = "https://raw.githubusercontent.com/jgudo/react-weather-app/master/static/country-code.json";

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<boolean>(true);
  const [countryCodes, setCountryCodes] = React.useState([]);
  const [value, setValue] = React.useState<any>("");


  async function fetchCountryList() {
    try {
      const requestCountryCode = await fetch(countryCodeEndpoint);
      const countryCode = await requestCountryCode.json();
      setCountryCodes(countryCode);
    } catch (error) {
      console.log(error);
    }
  }


  React.useEffect(() => {
    document.body.style.backgroundColor = theme ? "#101827" : "#DDDDDD";
  }, [theme]);

  React.useEffect(() => {
    fetchCountryList();
  }, []);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} countryCodes={countryCodes} value={value} setValue={setValue} />} />

        {/* <Route path="/history" element={<History theme={theme}  />} /> */}
      </Routes>
    </>
  );
};

export default App;
