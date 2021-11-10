import React, { useContext } from "react";
//Context
import { WeatherContext } from "../../context/set_context";
//Charts
import { D3Charts } from "../../components/charts/D3Charts";
//Styles and assets
import windy_icon from "../../assets/weathorIcon/icon/wind.png";
import "./styles/CardLeft.styles.css";

/**
 * @Component Card Left in Dashboard page
 * @returns JSX Element
 */

export const CardLeft = (): JSX.Element => {
  // Get state value from HOC Context
  const {
    current_temp,
    city,
    weather_icon,
    weather_label,
    local_time,
    wind_level,
  } = useContext(WeatherContext);

  /**
   * If a city value has been found
   * render Charts and Weather
   * or
   * render Welcome Page
   */
  return (
    <>
      {/* if there is a city entered */}
      {!!city ? (
        <div className="card_left">
          <div className="card_left_content_box">
            <div className="card_header">
              <div className="city">
                <div className="city_name">{city}</div>
                <div className="city_time">{local_time}</div>
              </div>
            </div>
            <div className="card_left_charts_box">
              <div className="card_left_charts">
                <D3Charts />
              </div>
            </div>

            <div className="card_title">
              <div className="temp">{`${current_temp}°`}</div>

              <div className="weather">
                <img
                  src={weather_icon}
                  alt=""
                  width="58px"
                  height="58px"
                  className="weather_icon"
                />
                <span className="iconlabel">{weather_label}</span>
              </div>
              <div className="weather">
                <img
                  src={windy_icon}
                  alt=""
                  width="58px"
                  height="58px"
                  className="weather_icon"
                />
                <span className="iconlabel">{`${wind_level}km/h`}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // if no city has been entered yet
        <div className="card_left_welcome"></div>
      )}
    </>
  );
};
