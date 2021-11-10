import React from "react";
//styles
import "./Dashboard.styles.css";
//Components
import { CardLeft } from "./component/CardLeft";
import { CardRight } from "./component/CardRight";

/**
 * @Dashboard Pages
 * @returns JSX Element
 */

export const Dashboard = (): JSX.Element => {
  return (
    <div className="card_container">
      <div className="app_header_container">
        <div className="web_header" data-testid="app_header">
          Welcome to the Weather Forecast Application
        </div>
        <div className="web_sub_header" data-testid="app_sub_header">
          Please input a city from right to start using this app!
        </div>
      </div>
      <div className="card_box">
        <CardLeft />
        <CardRight />
      </div>
    </div>
  );
};
