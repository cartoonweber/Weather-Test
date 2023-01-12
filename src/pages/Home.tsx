/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Input } from "../components/Input";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getWeather } from "../async/getWeather";
import { debounce } from "lodash";
import { weatherbitIcons } from "../helpers/getIcon";

type IHome = {
  theme: boolean;
  countryCodes: any;
};

const Home: React.FC<IHome> = ({ theme, countryCodes }) => {
  const [value, setValue] = React.useState<string>("");
  const [isCelcius, setIsCelcius] = React.useState(false);
  const dispatch = useAppDispatch();
  const { weather } = useAppSelector((state) => state.weather);
  // const { savedWeather } = useAppSelector((state) => state.saved);
  // const findWeather = savedWeather.find((el) => {
  //   if (el.name === (weather?.name as string)) {
  //     return true;
  //   }
  // });
  const searchHandler = React.useCallback(
    debounce((e) => {
      console.log("DDDDD");
      dispatch(getWeather(e));
    }, 1000),
    []
  );
  const onChangeInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    searchHandler(e.target.value);
  }, []);

  console.log(weather);
  return (
    <main className={theme ? "dark" : ""}>
      <div className="text-gray-100  max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col items-center py-10">
        <Input theme={theme} value={value} onChangeInput={onChangeInput} />

        {weather && weather.length ? (
          <>
            <i className={`wi ${weatherbitIcons[weather[0].weatherIconCode]} text-[210px]`} />
            <div className="temperature-control">
              <h1 className="weather-temp">{isCelcius ? `${weather[0].tempCelcius} °C` : `${weather[0].tempFahrenheit} °F`}</h1>
              <div
                className="temperature-toggle"
                style={{
                  color: isCelcius ? "rgba(255, 255, 255, .7)" : "#adff2f",
                }}
                onClick={() => setIsCelcius(!isCelcius)}
              >
                <span>{isCelcius ? "°F" : "°C"}</span>
              </div>
            </div>

            <div className="temperature-info">
              <div className="location">
                <h2>
                  {weather[0].city}, {countryCodes[weather[0].country]}
                </h2>
                {/* <img src={`${weather[0].countryFlagsUrl}/${weather[0].country}/shiny/64.png`} alt=""/> */}
              </div>
              <h4 style={{ textTransform: "capitalize" }}>
                <span>Timezone:</span> {weather[0].zoneName}
              </h4>
              <h4 style={{ textTransform: "capitalize" }}>
                <span>Weather:</span> {weather[0].weatherDescription}
              </h4>
              <h4>
                <span>Wind Speed:</span> {weather[0].windSpeed} km/h
              </h4>
              <h4>
                <span>Humidity:</span> {weather[0].humidity}%
              </h4>
              <h4>
                <span>Date:</span> {weather[0].displayTime}
              </h4>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};
export default Home;
