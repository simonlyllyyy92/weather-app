import { render, screen, waitFor } from "@testing-library/react";
import { CardRight } from "../../pages/component/CardRight";
import userEvent from "@testing-library/user-event";

describe("Right Card Test", () => {
  beforeEach(() => {
    render(<CardRight />);
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

    await waitFor(async () => await userEvent.click(search_submit));

    let errorMsg = await screen.queryAllByText(/required/i);

    // Should show error msg
    errorMsg = await screen.queryAllByText(/required/i);
    await waitFor(async () => await expect(errorMsg).toHaveLength(1));

    // error msg will gone when user input  -- delay: 1 here is compulsory because of using formik
    await waitFor(async () => await userEvent.type(city_input, "Sydney"));
    errorMsg = await screen.queryAllByText(/required/i);
    await waitFor(async () => await expect(errorMsg).toHaveLength(0));
  });
});
