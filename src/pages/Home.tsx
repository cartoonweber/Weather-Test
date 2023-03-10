/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Input } from "../components/Input";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getWeather } from "../async/getWeather";
import { debounce } from "lodash";
import { weatherbitIcons } from "../helpers/getIcon";
import styled from "styled-components";
import DailyInfoCard from "./DailyInfoCard";
import PerformanceChart from "./PerformanceChart";
import useRefresh from "../hooks/useRefresh";
import { Coords } from "../App";

type IHome = {
  theme: boolean;
  countryCodes: any;
  value: any;
  setValue: any;
};


type Location = {
  coords: Coords;
  timestamp: number;
};

const Home: React.FC<IHome> = ({ theme, countryCodes, value, setValue }) => {
  const [isCelcius, setIsCelcius] = React.useState(false);
  const [chartIndex, setChartIndex] = React.useState(0);
  const [chartData, setChartData] = React.useState([]);
  const [prevValue, setPrevValue] = React.useState<string>("");
  const [allowLPermission, setAllowLPermission] = React.useState<any>();
  const [IPLocation, setIPLocation] = React.useState<any>();

  const dispatch = useAppDispatch();
  const { fastRefresh } = useRefresh();
  const { status, weather } = useAppSelector((state) => state.weather);

  async function fetchWeatherByIP() {
    const ipdataApiKey = "2efa6ba99cac072c204b5778b85b65b3df711edd1db8682afbfb4f01";
    const ipdataEndpoint = `https://api.ipdata.co/?api-key=${ipdataApiKey}`;
    const requestLocation = await fetch(ipdataEndpoint);
    const location = await requestLocation.json();

    setIPLocation(location);
  }

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (response: Location) => {
        setAllowLPermission(response.coords);
      },
      (error: any) => {
      }
    );
    fetchWeatherByIP();
  }, []);


  useEffect(() => {
    if (typeof value === 'object' ? !value : !value.length) return;
    if (status === "pending") return;
    if (status === "rejected") {
      if (prevValue === value) return;
      else {
        console.log(value);
        dispatch(getWeather(value));
      }
    }
    else {
      console.log(value);
      dispatch(getWeather(value));
    }
  }, [fastRefresh, value]);

  useEffect(() => {
    if (status === 'rejected') { if (prevValue !== value) setPrevValue(value) }
  }, [status])
  const onChangeInput = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  useEffect(() => {
    if (!weather) return;
    let _data: any = [];
    for (let i = 0; i < weather.forecast[chartIndex].hour.length; i++) _data.push(isCelcius ? weather.forecast[chartIndex].hour[i].temp_c : weather.forecast[chartIndex].hour[i].temp_f);
    setChartData(_data);
  }, [isCelcius, chartIndex, weather]);

  return (
    <main className={theme ? "dark" : ""}>
      <div className="font-bold text-gray-100  max-w-screen-xl mx-auto px-3 lg:px-6 flex flex-col items-center py-10">
        {allowLPermission ?
          <div className="text-[#2FD35D] font-normal">You Enabled Google Location Permission <span className="font-bold underline cursor-pointer" onClick={() => setValue(allowLPermission)}>Location Info</span></div> : ''
        }
        {!allowLPermission && IPLocation ? <div className="text-[#ea3943] font-normal">You Disabled Google Location Permission <span className="font-bold underline cursor-pointer" onClick={() => setValue(IPLocation)}>Location Info By IP Address</span></div> : ''}
        <div className="w-full max-w-[300px] mt-3">
          <Input theme={theme} value={value} onChangeInput={onChangeInput} />
        </div>

        {weather ? (
          <div>
            <Weather>
              <WeatherWrapper>
                <img src={weather.weatherLogo} alt={""} className={"min-w-[120px]"} />
                {/* <img src={"/climate.webp"} alt={""} className={"min-w-[120px]"} /> */}
                <div className="relative text-right">
                  <h1 className="font-bold my-6">{isCelcius ? `${weather.tempCelcius} ??C` : `${weather.tempFahrenheit} ??F`}</h1>
                  <TemperatureToggle
                    style={{
                      color: isCelcius ? "rgba(255, 255, 255, .7)" : "#adff2f",
                    }}
                    onClick={() => setIsCelcius(!isCelcius)}
                  >
                    <span>{isCelcius ? "??F" : "??C"}</span>
                  </TemperatureToggle>
                </div>
              </WeatherWrapper>

              <TemperatureInfo>
                <Location>
                  <h2 className={"my-5"}>
                    {weather.city}, {weather.country}
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
            <div className="flex justify-center mt-10">
              <DailyInfoCard data={weather.forecast} isCelcius={isCelcius} index={chartIndex} setIndex={setChartIndex} />
            </div>
            <div className="mt-8">
              <div className="flex justify-end text-2xl">{weather.forecast[chartIndex].date}</div>
              <div style={{ marginTop: "-15px" }}>
                <PerformanceChart data={chartData} />
              </div>
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
  > div > h1 {
    font-size: 48px;
  }

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 16px;
    > div > h1 {
      font-size: 36px;
    }
    > img {
      min-width: 100px;
    }
  }
`;

const Weather = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  transition: all 0.5s;

  @media (max-width: 400px) {
    flex-direction: column;
    margin-top: 30px;
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
    @media (max-width: 600px) {
      font-size: 20px;
    }
  }
`;
const TemperatureInfo = styled.div`
  margin-bottom: 16px;
  position: relative;
  padding-left: 48px;

  h4 {
    span {
      font-weight: normal;
      margin-right: 12px;
      @media (max-width: 600px) {
        font-size: 13px;
      }
    }
  }

  @media (max-width: 400px) {
    padding-left : 0;
  }
  @media (max-width: 600px) {
    font-size: 13px;
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
