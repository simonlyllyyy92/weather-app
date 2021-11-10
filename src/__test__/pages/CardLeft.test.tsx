import { CardLeft } from "../../pages/component/CardLeft";
import { Dashboard } from "../../pages/Dashboard";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Left Card Test", () => {
  beforeEach(() => {
    render(<Dashboard />);
  });
  test("Should display chart after city input", async () => {
    // input Sydney
    const city_input = await screen.getByTestId("city_input");
    await waitFor(async () => await userEvent.type(city_input, "Sydney"));
    // click submit
    const search_submit = await screen.findByTestId("search_submit");
    await waitFor(async () => await userEvent.click(search_submit));
    //After clicking search, the response will be from mock/handler.ts
    // await waitFor(async () => await expect(left_chart_city).toEqual("Sydney"));·
  }, 30000);
});
