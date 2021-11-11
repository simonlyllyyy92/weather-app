import { Dashboard } from "../../pages/Dashboard";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { chartsGenerate } from "../../__test__utils/ChartsHelper";
import { customRender } from "../../__test__utils/CustomRender";

test("Charts should be same with the same input", async () => {
  customRender(<Dashboard />);

  // input Sydney
  const city_input = screen.getByTestId("city_input");
  await waitFor(async () => await userEvent.type(city_input, "Sydney"));
  // click submit
  const search_submit = await screen.findByTestId("search_submit");
  userEvent.click(search_submit);

  //welcome page will disappear
  await waitForElementToBeRemoved(() => screen.getByTestId("welcome-card"));

  //this is the demo data created based on MSW handler response
  const mapped_data_from_msw = [
    {
      date: new Date("2021-11-10 00:00"),
      value: 18.3,
    },
    {
      date: new Date("2021-11-10 01:00"),
      value: 19.3,
    },
    {
      date: new Date("2021-11-10 02:00"),
      value: 20.3,
    },
  ];
  //Match snap shot of the generated charts
  // and test based on the same input from MSW, will the same svg be genereated
  const charts = chartsGenerate(mapped_data_from_msw);
  await waitFor(() => expect(charts.node()).toMatchSnapshot());
});
