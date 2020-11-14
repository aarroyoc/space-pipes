import React from 'react';
import { render } from '@testing-library/react';
// @ts-ignore
import { ThemeProvider, createTheme } from 'arwes';
import SizeSelector from "./SizeSelector";

test("render matchs snapshot", () => {
    const {container} = render(
        <ThemeProvider theme={createTheme()}>
            <SizeSelector to="netwalk" sizes={new Set([5, 7, 9])}/>
        </ThemeProvider>);
    expect(container).toMatchSnapshot();
});