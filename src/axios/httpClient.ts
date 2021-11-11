import axios from "axios";

/**
 * We set up the baseUrl for all api requests
 */

export const baseUrl = "https://api.weatherapi.com/v1";

// Can only receive the response for the upcoming TWO days data from weather.api
export const httpClient = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  params: {
    key: "0ca8574286614a1280b225229211111",
    days: "3",
  },
});
