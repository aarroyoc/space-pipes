import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders', () => {
  render(<App />);
  const linkElement = screen.getByText(/SpacePipes/i);
  expect(linkElement).toBeInTheDocument();
});

/*test("render matchs snapshot", () => {
  const { container }= render(<App/>);
  expect(container).toMatchSnapshot();
});*/

test("click on play", () => {
  render(<App/>);
  const playButton = screen.getByText("Play square mode");
  fireEvent.click(playButton);
  const instructions = screen.queryByText("Select the size of the puzzle")
  expect(instructions).toBeInTheDocument();
});