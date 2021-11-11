import { render } from "@testing-library/react";
import { WeatherContextProvider } from "../context/setContext";

export const customRender = (ui: JSX.Element, options?: any) => {
  return render(ui, { wrapper: WeatherContextProvider, ...options });
};
