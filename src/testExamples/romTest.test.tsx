import React from "react";
import ReactDOM from "react-dom";
// import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";
import SingupPage from "../components/sign-up/SignupPage";
import "@testing-library/jest-dom";

// const navigate = useNavigate();

const sum = (num1: number, num2: number): number => num1 + num2;

it("sums numbers", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});

// it("renders without crashing", () => {
//   render(
//     <SingupPage />,
//     document.getElementById('app')
//   );

// const { queryByTestId } = render(<SingupPage />);

// expect(queryByTestId(/username/i)).toBeNull();
// navigate("/");
// expect(sum(2, 2)).toEqual(4);
// expect(screen.getByText(/Menahem/i)).toBeInTheDocument();
// expect(screen.getByText(/SingupPage/i)).toBeNull();

// const div = document.createElement("div");
// ReactDOM.render(<App />, div);
// });

export {};
