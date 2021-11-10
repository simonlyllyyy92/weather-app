import React, { useContext } from "react";
//Formik
import { useFormik, FormikHelpers } from "formik";
//API
import { get_current_weather_by_city } from "../../services/WeatherService";
//Styles
import "./CityInputForm.styles.css";
//MUI Component
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { FormHelperText } from "@mui/material";
//Context
import { WeatherContext } from "../../context/set_context";
//Validation
import { CityInputFormSchema } from "./CityInputForm.schema";

export interface CountryInputProps {
  city: string;
}

/**
 * @Component Form used for city input in Card Right component
 * @returns formik controlled MUI form
 */

export const CityInputForm = () => {
  // Handle state function used from HOC context
  const { handleCurrentWeatherChange } = useContext(WeatherContext);
  // Helper functions used for above
  const mapData = (props: Array<any>) => {
    return props.map((item) => {
      return {
        date: new Date(item.time),
        value: item.temp_c,
      };
    });
  };

  /**
   * @Formik
   */

  // Submission
  const handleOnClick = async ({ city }: { city: string }) => {
    // Api call
    // Error handling has been done in useFormik function below
    let res = await get_current_weather_by_city(city);
    const { data } = res;
    // update state value
    handleCurrentWeatherChange({
      current_temp: data.current.temp_c,
      city: data.location.name,
      weather_icon: data.current.condition.icon,
      weather_label: data.current.condition.text,
      local_time: data.location.localtime,
      wind_level: data.current.wind_kph,
      forecast: data.forecast.forecastday,
      mapped_current_weather: mapData(data.forecast.forecastday[0].hour),
    });
    console.log(res.data);
  };
  // Initial Value
  const initialValues: CountryInputProps = {
    city: "",
  };
  // Formik initiation
  const formik = useFormik({
    initialValues,
    validationSchema: CityInputFormSchema,
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
      <FormControl
        sx={{ m: 1, width: "90%" }}
        variant="filled"
        error={Boolean(formik.errors.city) && formik.touched.city}
      >
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
                aria-label="search-city"
                edge="end"
                sx={{ color: "#fff" }}
                type="submit"
                aria-describedby="search-city-error"
              >
                {<SearchIcon />}
              </IconButton>
            </InputAdornment>
          }
        />
        {Boolean(formik.errors.city) && formik.touched.city && (
          <FormHelperText id="search-city-error">
            {formik.errors.city}
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
};
