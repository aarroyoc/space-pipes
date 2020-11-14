import React from 'react';
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button } from 'arwes';

import "./Home.css";

export default function Home(){
    const history = useHistory();
    return (
            <div className="home">
                <Heading node="h1">SpacePipes</Heading>
                <div className="home__buttons">
                    <Button animate layer="success" onClick={() => history.push("/netwalk")}>Play square mode</Button>
                    <div className="home__padding"></div>
                    <Button animate layer="success" onClick={() => history.push("/hexawalk")}>Play hexa mode</Button>
                    <div className="home__padding"></div>
                    <Button animate onClick={() => history.push("/rules")}>Rules</Button>
                </div>
                <small>&copy; Adrián Arroyo Calle</small>
            </div>
    );
}