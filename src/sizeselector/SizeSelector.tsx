import React from 'react';
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button } from 'arwes';

import "./SizeSelector.css";

type Props = {
    to: string;
    sizes: Set<number>;
}

export default function SizeSelector({to, sizes}: Props){
    const history = useHistory();
    return (
            <div className="home">
                <Heading node="h1">SpacePipes</Heading>
                <p>Select the size of the puzzle</p>
                <div className="home__buttons">
                    {sizes.has(5) && <Button animate onClick={() => history.push(`/${to}/5`)}>5x5</Button>}
                    <div className="home__padding"></div>
                    {sizes.has(7) && <Button animate onClick={() => history.push(`/${to}/7`)}>7x7</Button>}
                    <div className="home__padding"></div>
                    {sizes.has(9) && <Button animate onClick={() => history.push(`/${to}/9`)}>9x9</Button>}
                </div>
            </div>
    );
}