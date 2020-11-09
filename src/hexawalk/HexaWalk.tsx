/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button, Frame } from 'arwes';
// @ts-ignore
import pl from "tau-prolog";
// @ts-ignore
import listLoader from "tau-prolog/modules/lists";
// @ts-ignore
import randomLoader from "tau-prolog/modules/random";

import "./HexaWalk.css";

type HexaCellData = {
    up: boolean;
    down: boolean;
    upleft: boolean;
    upright: boolean;
    downleft: boolean;
    downright: boolean;
    x: number;
    y: number;
}

type HexaCellProps = {
    origin: boolean;
    connected: boolean;
    data: HexaCellData;
    onClick: (data: HexaCellData) => void;
}

const move = (data: HexaCellData): HexaCellData => {
    const newData = {
        x: data.x,
        y: data.y,
        up: data.upleft,
        upright: data.up,
        downright: data.upright,
        down: data.downright,
        downleft: data.down,
        upleft: data.downleft,
    }
    return newData;
}

function HexaCell({origin, connected, data, onClick}: HexaCellProps){
    const connectedColor = "#00b7a1";
    const noConnectedColor = "#006E61";
    /*
    <svg viewBox="0 0 64 64" onClick={onClick}>
        <polygon points="0, 32 16, 4.28 48, 4.28 64, 32 48, 59.71 16, 59.71"/>
    </svg>
    */

    const onClickHandler = () => {
        onClick(move(data));
    };

    // 0 0 64 55.42
    const translateX = (data.x - 1)*48;
    let translateY = (data.y - 1)*55.42;
    if(data.x % 2 === 1){
        translateY += 27.71;
    }
    // <polygon fill={noConnectedColor} points="0, 27.71 16, 0 48, 0 64, 27.71 48, 55.42 16, 55.42"/>
    const color = connected ? connectedColor : noConnectedColor;
    return (
        <g transform={`translate(${translateX}, ${translateY})`} onClick={onClickHandler}>
            
            <circle cx="32" cy="27.71" r="15" fill={color}/>
            {data.up && <line x1="32" y1="0" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {data.down && <line x1="32" y1="55.42" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {data.upleft && <line x1="8" y1="13.85" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {data.upright && <line x1="56" y1="13.85" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {data.downleft && <line x1="8" y1="41.56" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {data.downright && <line x1="56" y1="41.56" x2="32" y2="27.71" stroke={color} stroke-width="18"/>}
            {origin && <g transform="scale(0.5), translate(32, 27.71)">
                <polygon stroke="#D11F1F" fill={connectedColor} stroke-width="10" points="0, 27.71 16, 0 48, 0 64, 27.71 48, 55.42 16, 55.42"/>
            </g>}
        </g>
    );
}

type Props = {
    size: number;
};

export default function HexaWalk({size}: Props){
    const history = useHistory();
    const [win, setWin] = useState(false);
    const [time, setTime] = useState(0);
    const [grid, setGrid] = useState<HexaCellData[]>([]);
    const [connected, setConnected] = useState<Set<string>>(new Set());
    const [session] = useState(pl.create(1000));
    listLoader(pl);
    randomLoader(pl);

    const middleX = Math.ceil(size / 2);
    const middleY = middleX;

    useEffect(()=>{
        setTimeout(()=>{
            if(!win){
                setTime(time+1);
            }
        }, 1000);
    });

    useEffect(()=>{
        fetch("/prolog/hexaprim.pl")
        .then((response)=>{
            return response.text();
        })
        .then((prologCode) => {
            session.consult(prologCode);
            session.query(`assertz(origin(point(${middleX}, ${middleY}))), assertz(size(${size})).`);
            session.answer((x: any) => {
                session.query(`generate_grid(${middleX}, ${middleY}, HexCell).`);
                session.answer((x: any) => {
                    const result = pl.format_answer(x);
                    const regex = new RegExp(/hexacell\(point\((\d),(\d)\),(true|false),(true|false),(true|false),(true|false),(true|false),(true|false)\)/g);
                    let m;
                    const newGrid = [];
                    do{
                        m = regex.exec(result);
                        if(m){
                            newGrid.push({
                                x: parseInt(m[1]),
                                y: parseInt(m[2]),
                                up: m[3] === "true",
                                upright: m[4] === "true",
                                downright: m[5] === "true",
                                down: m[6] === "true",
                                downleft: m[7] === "true",
                                upleft: m[8] === "true"
                            });
                        }
                    } while(m);
                    const randomGrid = newGrid.map((cell)=>{
                        const rnd = Math.floor(Math.random()*5);
                        let newCell = cell;
                        for(let i=0;i<rnd;i++){
                            newCell = move(newCell);
                        }
                        return newCell;
                    });
                    setGrid(randomGrid);
                });
            });
            
        });
    }, []);

    useEffect(()=>{
        if(grid.length > 0){
            const loadData = grid.reduce((text, cell) => {
                return text + `assertz(hexacell(point(${cell.x}, ${cell.y}), ${cell.up.toString()}, ${cell.upright.toString()}, ${cell.downright.toString()}, ${cell.down.toString()}, ${cell.downleft.toString()}, ${cell.upleft.toString()})),`;
            }, "retractall(hexacell(_,_,_,_,_,_,_)),");
            session.query(`${loadData} solve_grid(Connected).`);
            session.answer((x: any) => {
                const result = pl.format_answer(x);
                const regex = new RegExp(/point\((\d),(\d)\)/g);
                const newConnected: Set<string> = new Set();
                let m;
                do {
                    m = regex.exec(result);
                    if(m){
                        newConnected.add(`${m[1]},${m[2]}`);
                    }
                } while(m);
                setConnected(newConnected);
            });
        }
    }, [grid]);
    
    if(grid.length > 0 && connected.size === grid.length && !win){
        setWin(true);
    }

    const onChange = (idx: number, cell: HexaCellData) => {
        const newGrid = [...grid];
        newGrid.splice(idx, 1, cell);
        setGrid(newGrid);
    };

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = () => {
        if(seconds < 10){
            return  `${minutes}:0${seconds}`;
        }else{
            return  `${minutes}:${seconds}`;
        }
    }

    const width = 48*size + 16;
    const height = 55.42*size;

    return (
        <div className="hexawalk">
            <Heading node="h1">Hexa Space Pipes</Heading>
            <Frame animate level={3} corners={4}>
                <svg viewBox={`0 0 ${width} ${height}`} className="hexawalk__grid">
                    {grid.map((cell, idx) => {
                        return <HexaCell 
                            connected={connected.has(`${cell.x},${cell.y}`)} 
                            key={idx}
                            origin={middleX === cell.x && middleY === cell.y}
                            data={cell}
                            onClick={(data) => onChange(idx, data)}/>
                    })}
                </svg>
            </Frame>
            {win && <div className="netwalk__dialog">
                <Frame animate level={3} corners={6}>
                    <Heading node="h2">Victory!</Heading>
                    <Button layer="success" onClick={() => history.push("/hexawalk")}>Play again</Button>
                </Frame>
            </div>}
            <div className="hexawalk__details">
                <div>{timeString()}</div>
                <Button animate onClick={() => history.push("/")}>Return to menu</Button>
            </div>
        </div>
    );
}