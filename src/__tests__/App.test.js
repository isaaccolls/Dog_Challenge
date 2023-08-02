import React from "react";
import { render, screen, act } from "@testing-library/react";
import App from "../App";
import DogList from "../components/DogList";

test("renders App component", async () => {
  await act(async () => {
    render(<App />);
  });
  const appElement = screen.getByTestId("app-component");
  expect(appElement).toBeInTheDocument();
});

test("renders DogList component", async () => {
  await act(async () => {
    render(<DogList onSelect={() => {}} />);
  });
  const dogListElement = screen.getByText("Choose Breeds!");
  expect(dogListElement).toBeInTheDocument();
});

test("renders Show Images button in DogList", async () => {
  await act(async () => {
    render(<DogList onSelect={() => {}} />);
  });
  const showImagesButton = screen.getByText("Show Images");
  expect(showImagesButton).toBeInTheDocument();
  expect(showImagesButton).toBeEnabled();
});
