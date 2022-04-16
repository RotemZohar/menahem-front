import React from "react";
import { render } from "@testing-library/react";
import SignInForm from "./SignInForm";

const sum = (num1: number, num2: number): number => num1 + num2;

test("username doesn't exist", () => {
  const { queryByTestId } = render(<SignInForm />);
  expect(queryByTestId(/username/i)).toBeNull();
});

// it("renders stuff", () => {
//   const component = render.create(<SignInForm />);
// });

export {};
