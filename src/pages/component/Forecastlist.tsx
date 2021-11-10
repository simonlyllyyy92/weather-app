import React, { useContext } from "react";
// MUI component
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
//Context
import { WeatherContext } from "../../context/set_context";
//Static config
import { day_list } from "../../config/week_day.config";

/**
 * @Component List Item in Card Right Componenent
 * @returns JSX Element
 */

export const Forecastlist = (): JSX.Element => {
  // Get the forcast state value from HOC Context
  const { forecast } = useContext(WeatherContext);

  //Render list of weather info if forecast from context has value
  //or
  //Render nothing but a react fragment
  return (
    <>
      {forecast.length > 0 && (
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
                  primary={day_list[new Date(item.date_epoch * 1000).getDay()]}
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
                  primary={`${Math.round(item.day?.mintemp_c)}°C ~ ${Math.round(
                    item.day?.maxtemp_c
                  )}°C`}
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
      )}
    </>
  );
};
