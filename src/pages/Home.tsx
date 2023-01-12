/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Input } from "../components/Input";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getWeather } from "../async/getWeather";
import { debounce } from "lodash";
import { weatherbitIcons } from "../helpers/getIcon";
import styled from "styled-components";
import DailyInfoCard from "./DailyInfoCard";

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
      <div className="font-bold text-gray-100  max-w-screen-xl mx-auto px-4 lg:px-6 flex flex-col items-center py-10">
        <div className="w-[300px]">
          <Input theme={theme} value={value} onChangeInput={onChangeInput} />
        </div>

        {weather ? (
          <div>
            <Weather>
              <WeatherWrapper>
                <img src={weather.weatherLogo} alt={""} />
                <div className="relative text-right">
                  <h1 className="text-[48px] font-bold my-6">{isCelcius ? `${weather.tempCelcius} °C` : `${weather.tempFahrenheit} °F`}</h1>
                  <TemperatureToggle
                    style={{
                      color: isCelcius ? "rgba(255, 255, 255, .7)" : "#adff2f",
                    }}
                    onClick={() => setIsCelcius(!isCelcius)}
                  >
                    <span>{isCelcius ? "°F" : "°C"}</span>
                  </TemperatureToggle>
                </div>
              </WeatherWrapper>

              <TemperatureInfo>
                <Location>
                  <h2 className={"my-5"}>
                    {weather.city}, {countryCodes[weather.country]}
                  </h2>
                </Location>
                <h4 className={"my-4 capitalize"}>
                  <span>Weather:</span> {weather.weatherDescription}
                </h4>
                <h4 className={"my-4"}>
                  <span>Wind Speed:</span> {weather.windSpeed} km/h
                </h4>
                <h4 className={"my-4"}>
                  <span>Humidity:</span> {weather.humidity}%
                </h4>
                <h4 className={"my-4"}>
                  <span>Date:</span> {weather.displayTime}
                </h4>
              </TemperatureInfo>
            </Weather>
            <div>
              <DailyInfoCard data={weather} isCelcius={isCelcius} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 80px;
  text-align: center;
  position: relative;

  @media (max-width: 500px) {
    padding-left: 0;
    padding-right: 16px;
  }

  @media (max-width: 300px) {
    padding: 0;
    width: 100%;
    flex-direction: row;
    align-items: center;
  }
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
  transition: all 0.5s;

  @media (max-width: 300px) {
    flex-direction: column;
  }

  i {
    font-size: 150px;
    flex-grow: 1;

    @media (max-width: 300px) {
      font-size: 80px;
      flex-grow: 0;
      order: 2;
    }
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5em;

  @media (max-width: 300px) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }

  img {
    width: 30px;
    height: 30px;
    margin-left: 16px;
  }

  h2 {
    @media (max-width: 300px) {
      font-size: 20px;
    }
  }
`;
const TemperatureInfo = styled.div`
  flex-grow: 1;
  margin-bottom: 16px;
  position: relative;
  padding-left: 48px;

  h4 {
    span {
      font-weight: normal;
      margin-right: 12px;
    }
  }

  @media (max-width: 300px) {
    width: 100%;
    padding-left: 0;
  }
`;

const TemperatureToggle = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 10px;
  right: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    cursor: pointer;
  }
`;
export default Home;
