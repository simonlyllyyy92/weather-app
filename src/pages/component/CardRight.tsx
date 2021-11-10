import React from "react";
//Form
import { CityInputForm } from "../../components/forms/CityInputForm";
//Components
import { Forecastlist } from "./Forecastlist";
//Styles
import "./styles/CardRight.styles.css";

/**
 * @Component Right Card in DashBoard Pages
 * @returns JSX Element
 */
export const CardRight = (): JSX.Element => {
  // render form and several MUI component
  return (
    <div className="card_right">
      <div className="card_right_content_box">
        <div className="input_container">
          <CityInputForm />
          <Forecastlist />
        </div>
      </div>
    </div>
  );
};
