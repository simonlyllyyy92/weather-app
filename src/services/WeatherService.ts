import { httpClient } from "../axios/http_client";

export interface Weather {
  current: any;
  location: any;
  forecast: any;
  code?: number;
  message?: string;
}

// Api for getting current weather forcast information
export const get_current_weather_by_city = (city: string) =>
  httpClient.get<Weather>("/forecast.json", {
    params: {
      q: city,
    },
  });
