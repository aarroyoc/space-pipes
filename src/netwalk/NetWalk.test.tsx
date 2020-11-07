import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import { ThemeProvider, createTheme } from 'arwes';
import NetWalk from "./NetWalk";

test("render", () => {
    render(
    <ThemeProvider theme={createTheme()}>
        <NetWalk size={5}/>
    </ThemeProvider>);

    const returnButton = screen.getByText("Return to menu");
    expect(returnButton).toBeInTheDocument();
});