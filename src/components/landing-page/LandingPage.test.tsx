import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";

function renderLandingPage() {
  return render(<LandingPage />);
}

let documentBody: RenderResult;

// describe("<LandingPage />", () => {
//   beforeEach(() => {
//     documentBody = render(<LandingPage />);
//   });
it("shows not found message", () => {
  // expect(documentBody.getByText("Not Found")).toBeInTheDocument();
  // expect(documentBody.getByText("404")).toBeInTheDocument();

  expect(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>
  ).toBeCalled();
});
// });

// it("kill numbers", () => {
//   expect(sum(1, 2)).toEqual(3);
//   expect(sum(2, 2)).toEqual(4);
// });

// test()
// test("username doesn't exist", () => {
//   const { findByTestId } = renderLandingPage();
// });

//   const { queryByTestId } = render(<LandingPage />);
//   expect(queryByTestId(/username/i)).toBeNull();
// });

// it("renders stuff", () => {
//   const component = render.create(<SignInForm />);
// });

// export {};
