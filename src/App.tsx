import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
// @ts-ignore
import { ThemeProvider, createTheme, Arwes, SoundsProvider, createSounds } from 'arwes';

import Home from "./home/Home";
import SizeSelector from "./sizeselector/SizeSelector";
import NetWalk from "./netwalk/NetWalk";

import './App.css';

const sounds = {
  shared: { volume: 1},
  players: {
    ask: {
      sound: { src: ["ask.mp3"]}
    },
    click: {
      sound: { src: ["click.mp3"]}
    },
    deploy: {
      sound: { src: ["deploy.mp3"]}
    },
    error: {
      sound: { src: ["error.mp3"]}
    },
    information: {
      sound: { src: ["information.mp3"]}
    },
    typing: {
      sound: { src: ["typing.mp3"]}
    },
    warning: {
      sound: { src: ["warning.mp3"]}
    }
  }
};

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <Arwes animate>
          <Router>
            <Switch>
              <Route path="/netwalk/5">
                <NetWalk size={5}/>
              </Route>
              <Route path="/netwalk/7">
                <NetWalk size={7}/>
              </Route>
              <Route path="/netwalk/9">
                <NetWalk size={9}/>
              </Route>
              <Route path="/netwalk">
                <SizeSelector/>
              </Route>
              <Route path="/">
                <Home/>
              </Route>
            </Switch>
          </Router>
        </Arwes>
      </SoundsProvider>
    </ThemeProvider>
  );
}

export default App;
