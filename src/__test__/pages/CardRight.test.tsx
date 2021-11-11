import { screen, waitFor } from "@testing-library/react";
import { CardRight } from "../../pages/component/CardRight";
import userEvent from "@testing-library/user-event";
import { customRender } from "../../__test__utils/CustomRender";
import { server } from "../../mock/server";
import { rest } from "msw";

describe("Right Card Test", () => {
  beforeEach(() => {
    customRender(<CardRight />);
  });
  test("should render right card properly", async () => {
    // City input label should be displayed properly
    const city_input_label = screen.getByTestId("city_input_label");
    const city_input = screen.getByTestId("city_input");
    expect(city_input_label).toBeInTheDocument();
    expect(city_input).toBeInTheDocument();

    // Should not show error message by default
    let errorMsg = await screen.queryAllByText(/required/i);
    expect(errorMsg).toHaveLength(0);
  });

  test("Form validation", async () => {
    // Click search without entering any city
    const search_submit = screen.getByTestId("search_submit");
    const city_input = screen.getByTestId("city_input");

    await waitFor(() => userEvent.click(search_submit));

    // Should show error msg
    let errorMsg = await screen.queryAllByText(/required/i);
    errorMsg = await screen.queryAllByText(/required/i);
    await waitFor(() => expect(errorMsg).toHaveLength(1));

    // error msg will gone when user input  -- delay: 1 here is compulsory because of using formik
    await waitFor(async () => await userEvent.type(city_input, "zxvyiopoi"));
    errorMsg = await screen.queryAllByText(/required/i);
    await waitFor(() => expect(errorMsg).toHaveLength(0));

    // Enter an Invalid city name will trigger alert
    server.resetHandlers(
      rest.get("http://api.weatherapi.com/v1/forecast.json", (req, res, ctx) =>
        res(ctx.status(400))
      )
    );

    userEvent.click(search_submit);
    const alertMock = jest.spyOn(window, "alert").mockImplementation();

    await waitFor(() => expect(alertMock).toHaveBeenCalledTimes(1));
  });

  test("Right card should display relative information for current and upcoming", async () => {
    //Find the element
    const search_submit = screen.getByTestId("search_submit");
    const city_input = screen.getByTestId("city_input");
    //Input Sydney
    await waitFor(() => userEvent.type(city_input, "Sydney"));
    //Click on search
    userEvent.click(search_submit);

    //Weather information detail for current will be shown
    const current_lists = await screen.findAllByTestId("current_list");
    await waitFor(() => expect(current_lists).toHaveLength(3));
    // Weather information for 3 days will be shown
    const forecast_lists = await screen.findAllByTestId("forecast_list");
    await waitFor(() => expect(forecast_lists).toHaveLength(3));
  });
});
