import { createContext, memo, useState } from "react";
import React from "react";

export interface DataType {
  date: any;
  value: any;
}

export interface WeatherContextProps {
  current_temp: string;
  city: string;
  weather_icon: string;
  weather_label: string;
  local_time: string;
  wind_level: string;
  forecast: Array<any>;
  mapped_current_weather: Array<DataType>;
  handleCountryChange: (newLocation: string) => void;
  handleTempChange: (newTemp: string) => void;
  handleCurrentWeatherChange: (props: Partial<WeatherContextProps>) => void;
}

const init_value: WeatherContextProps = {
  current_temp: "0",
  city: "",
  weather_icon: "",
  weather_label: "",
  local_time: "",
  wind_level: "",
  forecast: [],
  mapped_current_weather: [],
  handleCountryChange: (newLocation: string) => {},
  handleTempChange: (newTemp: string) => {},
  handleCurrentWeatherChange: (props: Partial<WeatherContextProps>) => {},
};

export const WeatherContext = createContext<WeatherContextProps>(init_value);

//For testing

export const WeatherContextProvider = memo(
  ({ children }: { children: any }): JSX.Element => {
    const handleTempChange = (newTemp: string) => {
      setState((prevState: WeatherContextProps) => ({
        ...prevState,
        current_temp: newTemp,
      }));
    };

    const handleCurrentWeatherChange = (
      props: Partial<WeatherContextProps>
    ) => {
      setState((prevState: WeatherContextProps) => ({
        ...prevState,
        ...props,
      }));
    };

    const handleCountryChange = (newLocation: string) => {
      setState((prevState: WeatherContextProps) => ({
        ...prevState,
        location: newLocation,
      }));
    };

    const [state, setState] = useState({
      current_temp: "0",
      city: "",
      weather_icon: "",
      weather_label: "",
      local_time: "",
      wind_level: "",
      forecast: [],
      mapped_current_weather: [],
      handleCountryChange,
      handleTempChange,
      handleCurrentWeatherChange,
    } as WeatherContextProps);

    return (
      <WeatherContext.Provider value={state}>
        {children}
      </WeatherContext.Provider>
    );
  }
);
