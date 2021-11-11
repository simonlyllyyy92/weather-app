import { rest } from "msw";

export const handlers = [
  /**
   * @API WeatherForecast handler
   */
  rest.get("http://api.weatherapi.com/v1/forecast.json", (req, res, ctx) => {
    return res(
      ctx.json({
        current: {
          temp_c: "18",
          wind_kph: "9",
          condition: {
            icon: "//cdn.weatherapi.com/weather/64x64/day/302.png",
            text: "Sunny",
          },
        },
        location: { name: "Sydney", localtime: "2021-11-10 15:32" },
        forecast: {
          forecastday: [
            {
              hour: [
                {
                  time: "2021-11-10 00:00",
                  temp_c: 18.3,
                },
                {
                  time: "2021-11-10 01:00",
                  temp_c: 19.3,
                },
                {
                  time: "2021-11-10 02:00",
                  temp_c: 20.3,
                },
              ],
            },
            {
              hour: [
                {
                  time: "2021-11-11 00:00",
                  temp_c: 18.3,
                },
                {
                  time: "2021-11-11 01:00",
                  temp_c: 19.3,
                },
                {
                  time: "2021-11-11 02:00",
                  temp_c: 20.3,
                },
              ],
            },
            {
              hour: [
                {
                  time: "2021-11-12 00:00",
                  temp_c: 18.3,
                },
                {
                  time: "2021-11-12 01:00",
                  temp_c: 19.3,
                },
                {
                  time: "2021-11-12 02:00",
                  temp_c: 20.3,
                },
              ],
            },
          ],
        },
      })
    );
  }),
];
