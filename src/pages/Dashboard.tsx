import React, { useContext } from "react";
//styles
import "./Dashboard.styles.css";
// Api service
import { get_current_weather_by_city } from "../services/weather_service";
//context
import { WeatherContext } from "../context/set_context";
import windy_icon from "../assets/weathorIcon/icon/wind.png";
//formik
import { useFormik, FormikHelpers } from "formik";
//Mui component
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Divider from "@mui/material/Divider";

//charts
import { D3Charts } from "../components/charts/D3Charts";

import { CityInputForm } from "../components/forms/CityInputForm";

/**
 * @Dashboard Pages
 */

//formik interface
export interface CountryInputProps {
  city: string;
}

export const Dashboard = () => {
  const {
    handleCurrentWeatherChange,
    current_temp,
    city,
    weather_icon,
    weather_label,
    local_time,
    wind_level,
    forecast,
  } = useContext(WeatherContext);

  const day_list = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const handleOnClick = async ({ city }: { city: string }) => {
    let res = await get_current_weather_by_city(city);
    const { data } = res;
    handleCurrentWeatherChange({
      current_temp: data.current.temp_c,
      city: data.location.name,
      weather_icon: data.current.condition.icon,
      weather_label: data.current.condition.text,
      local_time: data.location.localtime,
      wind_level: data.current.wind_kph,
      forecast: data.forecast.forecastday,
    });
    console.log(res.data);
    console.log(city);
  };

  //formik inital value

  const initialValues: CountryInputProps = {
    city: " ",
  };

  //formik
  const formik = useFormik({
    initialValues,
    onSubmit: (
      values: CountryInputProps,
      actions: FormikHelpers<CountryInputProps>
    ) => {
      try {
        actions.setSubmitting(true);
        handleOnClick(values);
      } catch (error) {
        alert(error);
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <div className="card_container">
      <div className="app_header_container">
        <div className="web_header">
          Welcome to the Weather Forecast Application
        </div>
        <div className="web_sub_header">
          Please input a city from right to start using this app!
        </div>
      </div>
      <div className="card_box">
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
          <div className="card_left_welcome"></div>
        )}
        <div className="card_right">
          <div className="card_right_content_box">
            <div className="input_container">
              <CityInputForm />
              <List
                sx={{
                  width: "90%",
                  bgcolor: "#1F324A",
                }}
              >
                {forecast.map((item, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemAvatar>
                        <img
                          src={item.day?.condition?.icon}
                          alt=""
                          width="48px"
                          height="48px"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          day_list[new Date(item.date_epoch * 1000).getDay()]
                        }
                        primaryTypographyProps={{
                          color: "white",
                        }}
                        secondary={item.date}
                        secondaryTypographyProps={{
                          color: "white",
                        }}
                        sx={{
                          width: "40%",
                        }}
                      />

                      <ListItemText
                        primary={`${Math.round(
                          item.day?.mintemp_c
                        )}°C ~ ${Math.round(item.day?.maxtemp_c)}°C`}
                        secondary={item.day?.condition?.text}
                        primaryTypographyProps={{
                          color: "white",
                        }}
                        secondaryTypographyProps={{
                          color: "white",
                        }}
                        sx={{
                          width: "60%",
                        }}
                      />
                    </ListItem>
                    {index != forecast.length - 1 && (
                      <Divider
                        variant="inset"
                        component="li"
                        sx={{ borderColor: "#3C4E76" }}
                      />
                    )}
                  </div>
                ))}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
