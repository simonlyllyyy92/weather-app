import { render } from "@testing-library/react";
import { WeatherContextProvider } from "../context/set_context";

export const customRender = (ui: JSX.Element, options?: any) => {
  return render(ui, { wrapper: WeatherContextProvider, ...options });
};
