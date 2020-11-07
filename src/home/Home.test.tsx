import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import { ThemeProvider, createTheme } from 'arwes';
import Home from "./Home";

test("render matchs snapshot", () => {
    const {container} = render(
        <ThemeProvider theme={createTheme()}>
            <Home/>
        </ThemeProvider>);
    expect(container).toMatchSnapshot();
});