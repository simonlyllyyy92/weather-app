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
import humidity from "../../assets/weathorIcon/icon/blue-humidity.png";
import visibility from "../../assets/weathorIcon/icon/visibility.png";
import chanceOfRain from "../../assets/weathorIcon/icon/rain-chance.png";
//styles
import "./styles/CurrentList.styles.css";

/**
 * @Component List Item in Card Right Componenent
 * @returns JSX Element
 */

export const Currentlist = (): JSX.Element => {
  // Get the forcast state value from HOC Context
  const { forecast } = useContext(WeatherContext);

  const listItemOne = forecast[0];

  //Render list of weather info if forecast from context has value
  //or
  //Render nothing but a react fragment
  return (
    <div className="current-weather-list-container">
      {forecast[0] ? (
        <>
          <h3 style={{ color: "#17C2E9" }}>Current</h3>
          <List
            sx={{
              width: "100%",
              bgcolor: "#1F324A",
            }}
          >
            <div>
              <ListItem data-testid={"current_list"}>
                <ListItemAvatar>
                  <img src={humidity} alt="" width="48px" height="48px" />
                </ListItemAvatar>
                <ListItemText
                  primary="Average Humidity (%)"
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "70%",
                  }}
                />
                <ListItemText
                  primary={listItemOne.day?.avghumidity}
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "30%",
                  }}
                />
              </ListItem>

              <Divider component="li" sx={{ borderColor: "#3C4E76" }} />

              <ListItem data-testid={"current_list"}>
                <ListItemAvatar>
                  <img src={visibility} alt="" width="48px" height="48px" />
                </ListItemAvatar>
                <ListItemText
                  primary="Average visibility (km)"
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "70%",
                  }}
                />
                <ListItemText
                  primary={listItemOne.day?.avgvis_km}
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "30%",
                  }}
                />
              </ListItem>
              <Divider component="li" sx={{ borderColor: "#3C4E76" }} />
              <ListItem data-testid={"current_list"}>
                <ListItemAvatar>
                  <img src={chanceOfRain} alt="" width="48px" height="48px" />
                </ListItemAvatar>
                <ListItemText
                  primary="Chance of Rain  (mm)"
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "70%",
                  }}
                />
                <ListItemText
                  primary={listItemOne.day?.daily_chance_of_rain}
                  primaryTypographyProps={{
                    color: "white",
                  }}
                  sx={{
                    width: "30%",
                  }}
                />
              </ListItem>
            </div>
          </List>
        </>
      ) : null}
    </div>
  );
};
