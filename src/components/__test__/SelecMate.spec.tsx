import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SelectMate from "../SelectMate";

let component;
const options = [
  {
    value: 1,
    label: "Opcion 1",
    selected: false,
  },
  {
    value: 2,
    label: "Opcion 2",
    selected: false,
  },
  {
    value: 3,
    label: "Opcion 5",
    selected: false,
  },
];

describe("Test SelectMate component ", () => {
  beforeEach(() => {
    component = render(<SelectMate options={options} />);
  });

  it("Check is show valid", () => {
    expect(screen.findByLabelText("Select an Option"));
  });

  it("Check is change the option", async () => {
    fireEvent.click(screen.getByRole("select-mate"));
    fireEvent.click(screen.getByRole("select-mate-option-1"));
    expect(screen.findByLabelText(/Opcion 2/));
  });

  it("Check is change the option again", async () => {
    fireEvent.click(screen.getByRole("select-mate"));
    fireEvent.click(screen.getByRole("select-mate-option-2"));
    expect(screen.findByLabelText(/Opcion 5/));
  });
});
