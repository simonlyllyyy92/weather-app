import React, { useContext } from "react";
import { useFormik, FormikHelpers } from "formik";
import { get_current_weather_by_city } from "../../services/weather_service";

import "./CityInputForm.styles.css";

import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { WeatherContext } from "../../context/set_context";

export interface CountryInputProps {
  city: string;
}

const initialValues: CountryInputProps = {
  city: " ",
};

export const CityInputForm = () => {
  const { handleCurrentWeatherChange } = useContext(WeatherContext);

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
    <form onSubmit={formik.handleSubmit} className="input_container_form">
      <FormControl sx={{ m: 1, width: "90%" }} variant="filled">
        <InputLabel htmlFor="filled-adornment-password" sx={{ color: "gray" }}>
          Enter a City
        </InputLabel>
        <FilledInput
          id="city"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          sx={{
            color: "#fff",
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="search city"
                edge="end"
                sx={{ color: "#fff" }}
                type="submit"
              >
                {<SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
