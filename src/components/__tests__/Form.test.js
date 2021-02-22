/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";
/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, getByText } from "@testing-library/react";
/*
  We import the component that we are testing
*/
import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react";

afterEach(cleanup);
describe("Form", ()=>{
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  it("renders without student name if not provided", ()=>{
    const { getByPlaceholderText } = render(
      <Form interviewers = { interviewers }/>
    );
    expect(getByPlaceholderText("Enter student name")).toHaveValue("");
  });
  it("renders with initial student name", ()=>{
    const {getByTestId} = render(
      <Form interviewers = {interviewers} name = "Lydia Miller-Jones"/>
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  it("validates that the student name is not blank", ()=>{
    //1. validation is shown 
    const onSave = jest.fn();
    const {getByText} = render(
      <Form interviewers = {interviewers} onSave = {onSave}/>
    );
    fireEvent.click(getByText("Save"));
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    //2. onSave is not called 
    
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
  const onSave = jest.fn();
  const { getByText, getByPlaceholderText, queryByText } = render(
    <Form interviewers={interviewers} onSave={onSave} />
  );

  fireEvent.click(getByText("Save"));

  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();

  fireEvent.change(getByPlaceholderText("Enter student name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByText("Save"));

  expect(queryByText(/student name cannot be blank/i)).toBeNull();

  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
});

it("calls onCancel and resets the input field", () => {
  const onCancel = jest.fn();
  const { getByText, getByPlaceholderText, queryByText } = render(
    <Form
      interviewers={interviewers}
      name="Lydia Mill-Jones"
      onSave={jest.fn()}
      onCancel={onCancel}
    />
  );

  fireEvent.click(getByText("Save"));

  fireEvent.change(getByPlaceholderText("Enter student name"), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByText("Cancel"));

  expect(queryByText(/student name cannot be blank/i)).toBeNull();

  expect(getByPlaceholderText("Enter student name")).toHaveValue("");

  expect(onCancel).toHaveBeenCalledTimes(1);
});

/*
the below 2 test blocks are replaced by "can successfully save after trying to submit an empty student name"
  it("calls onSave function when the name is defined", ()=>{
    //3. validation is not shown 
    //creating a fake function
    const onSave = jest.fn();
    //destructuring the function from render
    const {queryByText, getByText} = render(
      <Form interviewers = {interviewers} onSave = {onSave} name = "Lydia Miller-Jones"/>
    );
    //click the save button
    fireEvent.click(getByText("Save"));
    //we expect not defined in the doc. 
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    //4. onSave is called once
    expect(onSave).toHaveBeenCalledTimes(1);
    //5. onSave is called with the correct arguments, null is for interviewer
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
  it("submits the name entered by the user", () => {
  const onSave = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <Form interviewers={interviewers} onSave={onSave} />
  );

  const input = getByPlaceholderText("Enter student name");

  fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  fireEvent.click(getByText("Save"));

  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
});

*/


});
