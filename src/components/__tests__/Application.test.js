/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Application from "components/Application";
import Appointment from "components/Appointment/index";
import axios from "axios";
/*
  A test that renders a React Component
*/
afterEach(cleanup);

describe("Application", ()=>{
  it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async ()=>{
    //render the application
    const {container, debug} = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    //Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));
    //Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
    });
    //Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    //console.log(prettyDOM(appointment));
    //Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    //console.log(prettyDOM(container));
    //Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
    );
    //Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const {container, debug} = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByText(appointment, "Archie Cohen"));
  fireEvent.click(queryByAltText(appointment, "Delete"));
  
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => queryByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  debug();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const {container, debug} = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
  );
  fireEvent.click(queryByText(appointment, "Archie Cohen"));
  fireEvent.click(queryByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, "Enter student name"), {
  target: { value: "Lily James" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  // 4. Check that the saving message is shown.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  await waitForElement(() => getByText(appointment, "Lily James"));
  expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
  debug();
});
  it("shows the save error when failing to save an appointment", async() => {
  axios.put.mockRejectedValueOnce();
  // 1. Render the Application.
  const {container, debug} = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment")[0];
  // Try to book an appointment
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  fireEvent.click(getByText(appointment, "Save"));

  // Validate
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() =>
  getByText(appointment, /could not save appointment/i)
  );

  // Check that we can close the error message
  fireEvent.click(getByAltText(appointment, "Close"));
  expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();

});
it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  // Render component and wait for data to load
  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container,"appointment").find(appointment => queryByText(appointment, "Archie Cohen"));

  // Try to delete an appointment
  fireEvent.click(getByAltText(appointment, "Delete"));
  fireEvent.click(getByText(appointment, "Confirm"));

  // Validate
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() =>getByText(appointment, /could not cancel appointment/i));

  // Check that we can close the error message
  fireEvent.click(getByAltText(appointment, "Close"));
  console.log(prettyDOM(appointment));
  expect(getByText(appointment, "Could not cancel appointment")).toBeInTheDocument();
});

});



describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);

  });
});
