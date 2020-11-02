import React from 'react';
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button } from 'arwes';

import "./SizeSelector.css";

export default function SizeSelector(){
    const history = useHistory();
    return (
            <div className="home">
                <Heading node="h1">SpacePipes</Heading>
                <p>Select the size of the puzzle</p>
                <div className="home__buttons">
                    <Button animate onClick={() => history.push("/netwalk/5")}>5x5</Button>
                    <div className="home__padding"></div>
                    <Button animate onClick={() => history.push("/netwalk/7")}>7x7</Button>
                    <div className="home__padding"></div>
                    <Button animate onClick={() => history.push("/netwalk/9")}>9x9</Button>
                </div>
            </div>
    );
}