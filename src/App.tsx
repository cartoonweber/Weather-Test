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

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [theme, setTheme] = React.useState<boolean>(true);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response: Location) => {
        dispatch(getWeather(response.coords));
      },
      (error: any) => {
        const coords = {
          latitude: 37.450001,
          longitude: 12.523333,
        };
        dispatch(getWeather(coords));
      }
    );
  }, []);

  React.useEffect(() => {
    document.body.style.backgroundColor = theme ? "#101827" : "#DDDDDD";
  }, [theme]);

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />

        <Route path="/history" element={<History theme={theme} />} />
      </Routes>
    </>
  );
};

export default App;
