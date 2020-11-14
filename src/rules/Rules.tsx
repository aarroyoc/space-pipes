import React from 'react';
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button, Frame } from 'arwes';

import "./Rules.css";

export default function Rules(){
    const history = useHistory();
    return (
            <div className="rules">
                <Heading node="h1">Rules</Heading>
                <p>Rotate the elements to connect all of them to the center at the same time. Watch the video to see an example.</p>
                <Frame>
                    <video className="rules__video" loop autoPlay src="/SpacePipesRules.mp4"></video>
                </Frame>
                <Button animate onClick={() => history.push(`/`)}>Go back</Button>
            </div>
    );
}