import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { WeatherResponse } from "../types";
import type { WeatherState } from "../store/slices/weatherSlice";
import type { Coords } from "../App";
import moment from "moment";
import "moment-timezone";
import templateJSON from "./1.json";

export const getWeather = createAsyncThunk(
  "weather/getWeather",
  async (coord: Coords | string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { weather } = state as { weather: WeatherState };
      const { isMounted } = weather;
      if (!isMounted) {
        if (typeof coord === "object") {
          const url = `http://api.weatherapi.com/v1/forecast.json?key=c07f151caa674342a3152328231201&q=${coord.latitude},${coord.longitude}&days=7`;
          const response = await axios.get(url);
          const weather = response.data;
          // const weather = templateJSON;
          let temp: WeatherResponse = {
            city: weather.location.name,
            country: weather.location.country,
            lat: weather.location.lat,
            lon: weather.location.lon,
            tempCelcius: Math.round(weather.current.temp_c),
            tempFahrenheit: Math.round(weather.current.temp_f),
            weather: weather.current.condition.text,
            humidity: weather.current.humidity,
            windSpeed: weather.current.wind_kph,
            weatherDescription: weather.current.condition.text,
            weatherLogo: weather.current.condition.icon,
            displayTime: weather.current.last_updated,
            searchStatus: undefined,
            isSearching: false,
            forecast: weather.forecast.forecastday,
            loaded: true,
          };
          if (temp) {
            return temp;
          } else {
            return rejectWithValue("rejected");
          }
        }
      } else {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=c07f151caa674342a3152328231201&q=${coord}&days=7`
        );
        const weather = response.data;
        // const weather = templateJSON;
        let temp: WeatherResponse = {
          city: weather.location.name,
          country: weather.location.country,
          lat: weather.location.lat,
          lon: weather.location.lon,
          tempCelcius: Math.round(weather.current.temp_c),
          tempFahrenheit: Math.round(weather.current.temp_f),
          weather: weather.current.condition.text,
          humidity: weather.current.humidity,
          windSpeed: weather.current.wind_kph,
          weatherDescription: weather.current.condition.text,
          weatherLogo: weather.current.condition.icon,
          displayTime: weather.current.last_updated,
          searchStatus: undefined,
          isSearching: false,
          forecast: weather.forecast.forecastday,
          loaded: true,
        };
        if (temp) {
          return temp;
        } else {
          return rejectWithValue("rejected");
        }
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("rejected");
    }
  }
);
