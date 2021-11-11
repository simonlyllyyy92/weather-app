import { Dashboard } from "../../pages/Dashboard";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { customRender } from "../../__test__utils/CustomRender";
import userEvent from "@testing-library/user-event";

describe("Left Card Test", () => {
  test("Should display chart after city input", async () => {
    customRender(<Dashboard />);

    // input Sydney
    const city_input = screen.getByTestId("city_input");
    await waitFor(async () => await userEvent.type(city_input, "Sydney"));

    // click submit
    const search_submit = await screen.findByTestId("search_submit");
    userEvent.click(search_submit);

    //After clicking search, the response will be from mock/handler.ts
    //welcome page will disappear
    await waitForElementToBeRemoved(() => screen.getByTestId("welcome-card"));

    //chart page with proper value shown
    const chart_title = await screen.findByTestId("target_city");
    await waitFor(() => expect(chart_title).toHaveTextContent("Sydney"));

    const chart_date = await screen.findByTestId("target_time");
    await waitFor(() => expect(chart_date).toBeInTheDocument());

    const current_temp = await screen.findByTestId("curr_temp");
    await waitFor(() => expect(current_temp).toBeInTheDocument());

    const current_weather = await screen.findByTestId("curr_weather");
    await waitFor(() => expect(current_weather).toBeInTheDocument());

    const current_wind = await screen.findByTestId("curr_wind");
    await waitFor(() => expect(current_wind).toBeInTheDocument());
  }, 10000);
});
