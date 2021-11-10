import { render, screen, waitFor } from "@testing-library/react";
import { Dashboard } from "../../pages/Dashboard";

jest.mock("../../context/set_context", () => ({
  ...jest.requireActual("../../context/set_context"),
}));

describe("Dashboard Pages", () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  test("Dashboard page should render welcome page correctly, if no inputs are entered at the beginning", () => {
    //show header and sub header
    const header = screen.getByTestId("app_header");
    const sub_header = screen.getByTestId("app_sub_header");
    expect(header).toBeInTheDocument();
    expect(sub_header).toBeInTheDocument();

    //When just running app with no city input, render welcome card
    const welcome = screen.getByTestId("welcome-card");
    expect(welcome).toBeInTheDocument();

    //Right card render properly
    const right_card = screen.getByTestId("card_right_id");
    expect(right_card).toBeInTheDocument();
  });
});
