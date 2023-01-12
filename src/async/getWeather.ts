import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { WeatherResponse } from '../types';
import type { WeatherState } from '../store/slices/weatherSlice';
import type { Coords } from '../App';
import moment from 'moment';
import 'moment-timezone';

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (coord: Coords | string, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { weather } = state as { weather: WeatherState };
      const { isMounted } = weather;
      if (!isMounted) {
        if (typeof coord === 'object') {
          const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${coord.latitude}&lon=${coord.longitude}&days=7&key=fe96c2667f92472faf31bb323c0bb2cc`;
          const response = await axios.get(
            url
          );
          const weather = response.data;
          let temp: WeatherResponse[] = [];
          for (let i = 0; i < weather.length; i++) {
            temp.push({
              city: weather.city_name,
              country: weather.country_code,
              lat: weather.lat,
              lon: weather.lon,
              tempCelcius: Math.round(weather.data[0].temp),
              tempFahrenheit: Math.round((weather.data[0].temp * (9 / 5)) + 32),
              weather: weather.data[0].weather.description,
              humidity: weather.data[0].rh,
              windSpeed: weather.data[0].wind_spd.toFixed(2),
              weatherDescription: weather.data[0].weather.description,
              weatherIconCode: weather.data[0].weather.icon,
              displayTime: weather.timezone ? moment().tz(weather.timezone).format('LLLL') : '',
              searchStatus: undefined,
              isSearching: false,
              forecast: weather.data,
              zoneName: weather.timezone,
              loaded: true
            })
          }
          if (temp) {
            return temp;
          } else {
            return rejectWithValue('rejected');
          }
        }
      } else {
        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/forecast/daily?city=${coord}&days=7&key=fe96c2667f92472faf31bb323c0bb2cc`
        );
        const weather = response.data;
        let temp: WeatherResponse[] = [];
        for (let i = 0; i < weather.length; i++) {
          temp.push({
            city: weather.city_name,
            country: weather.country_code,
            lat: weather.lat,
            lon: weather.lon,
            tempCelcius: Math.round(weather.data[0].temp),
            tempFahrenheit: Math.round((weather.data[0].temp * (9 / 5)) + 32),
            weather: weather.data[0].weather.description,
            humidity: weather.data[0].rh,
            windSpeed: weather.data[0].wind_spd.toFixed(2),
            weatherDescription: weather.data[0].weather.description,
            weatherIconCode: weather.data[0].weather.icon,
            displayTime: weather.timezone ? moment().tz(weather.timezone).format('LLLL') : '',
            searchStatus: undefined,
            isSearching: false,
            forecast: weather.data,
            zoneName: weather.timezone,
            loaded: true
          })
        }
        if (temp) {
          return temp;
        } else {
          return rejectWithValue('rejected');
        }
      }
    } catch (error: any) {
      return rejectWithValue('rejected');
    }
  }
);
