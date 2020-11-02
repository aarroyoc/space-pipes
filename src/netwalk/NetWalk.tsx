import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// @ts-ignore
import { Heading, Button, Frame } from 'arwes';

import { generateGridPrim, randomizeGrid } from "./prim";
import { calculateConnections } from "./solver";
import { NetWalkCell } from "./celltypes";

import "./NetWalk.css";

type CellProps = {
    value: NetWalkCell;
    origin: boolean;
    connected: boolean;
    onChange: (value: NetWalkCell) => void;
}

const connectedColor = "#00b7a1";
const noConnectedColor = "#006E61";
const strokeWidth = "24";

function Origin(){
    return (
        <rect x="15" y="15" width="34" height="34" fill="none" stroke="#D11F1F" stroke-width="10"/>
    )
}

function EndCell({onChange, origin, value, connected}: CellProps){
    const onClick = () => {
        switch(value){
            case "end-left": onChange("end-up");break;
            case "end-up": onChange("end-right");break;
            case "end-right": onChange("end-down");break;
            case "end-down": onChange("end-left");break;
        }
    };
    const radius = () => {
        switch(value){
            case "end-left": return "0";
            case "end-up": return "90";
            case "end-right": return "180";
            case "end-down": return "270";
        }
    }
    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={`rotate(${radius()}, 32, 32)`}>
                <line x1="0" y1="32" x2="32" y2="32" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth}/>
                <circle cx="32" cy="32" r="20" fill={connected ? connectedColor : noConnectedColor}/>
                {!origin && <circle cx="32" cy="32" r="12" fill={connected ? "#D11F1F": "#961717"}/>}
                {origin && <Origin/>}
            </g>
        </svg>
    );
}

function QuadCell({origin, connected}: {origin: boolean, connected: boolean}){
    return (
        <svg viewBox="0 0 64 64">
            <g>
                <line x1="0" y1="32" x2="64" y2="32" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth} />
                <line x1="32" y1="0" x2="32" y2="64" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth} />
                {origin && <Origin/>}
            </g>
        </svg>
    )
}

function TrioCell({onChange, origin, value, connected}: CellProps){
    const onClick = () => {
        switch(value){
            case "trio-up-left-down": onChange("trio-left-up-right");break;
            case "trio-left-up-right": onChange("trio-up-right-down");break;
            case "trio-up-right-down": onChange("trio-left-down-right");break;
            case "trio-left-down-right": onChange("trio-up-left-down");break;
        }
    };
    const radius = () => {
        switch(value){
            case "trio-up-left-down": return "0";
            case "trio-left-up-right": return "90";
            case "trio-up-right-down": return "180";
            case "trio-left-down-right": return "270";
        }
    }

    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={`rotate(${radius()}, 32, 32)`}>
                <line x1="0" y1="32" x2="32" y2="32" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth}/>
                <line x1="32" y1="0" x2="32" y2="64" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth}/>
                {origin && <Origin/>}
            </g>
        </svg>
    );
}

function CornerCell({onChange, value, origin, connected}: CellProps) {
    const onClick = () => {
        switch(value){
            case "corner-up-left": onChange("corner-up-right");break;
            case "corner-up-right": onChange("corner-down-right");break;
            case "corner-down-right": onChange("corner-down-left");break;
            case "corner-down-left": onChange("corner-up-left");break;
        }
    };
    const radius = () =>  {
        switch(value){
            case "corner-up-left": return "0";
            case "corner-up-right": return "90";
            case "corner-down-right": return "180";
            case "corner-down-left": return "270";
        }
    };
    
    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={`rotate(${radius()}, 32, 32)`}>
                <line x1="0" y1="32" x2="44" y2="32" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth}/>
                <line x1="32" y1="0" x2="32" y2="44" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth}/>
                {origin && <Origin/>}
            </g>
        </svg>
    );
}

function LineCell({onChange, value, origin, connected}: CellProps) {
    const onClick = () => {
        if(value === "line-up-down"){
            onChange("line-left-right");
        }else{
            onChange("line-up-down");
        }
    };
    
    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={value === "line-up-down" ? "rotate(90, 32, 32)": ""}>
                <line x1="0" y1="32" x2="64" y2="32" stroke={connected ? connectedColor : noConnectedColor} stroke-width={strokeWidth} />
                {origin && <Origin/>}
            </g>
        </svg>
    );
}

type NetWalkProps = {
    size: number
}

export default function NetWalk({size}: NetWalkProps){
    const history = useHistory();
    const [win, setWin] = useState(false);
    const [time, setTime] = useState(0);
    useEffect(()=>{
        setTimeout(()=>{
            if(!win){
                setTime(time+1);
            }
        }, 1000);
    });
    const [grid, setGrid] = useState<NetWalkCell[]>([]);
    useEffect(()=>{
        if(!win){
            const newGrid = generateGridPrim(size);
            setGrid(randomizeGrid(newGrid));
        }
    }, [size, win]);

    const onChangeCell = (idx: number, value: NetWalkCell) => {
        const newGrid = [...grid];
        newGrid.splice(idx, 1, value);
        setGrid(newGrid);
    };

    const gridSize = 350 / size;
    const gridString = Array(size).fill(`${gridSize}px`).join(" ");
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeString = () => {
        if(seconds < 10){
            return  `${minutes}:0${seconds}`;
        }else{
            return  `${minutes}:${seconds}`;
        }
    }
    

    const connections = grid.length === size*size ? calculateConnections(grid) : Array(size*size).fill(false);
    if(connections.every(t => t) && !win){
        setWin(true);
    }

    return (
        <div className="netwalk">
            <Heading node="h1">Space Pipes</Heading>
            <Frame animate level={3} corners={4}>
                <div className="netwalk__grid" style={{gridTemplateColumns: gridString}}>
                    {grid.map((cell, idx)=>{
                        const origin = idx === Math.floor(size*size/2);
                        const connected = connections[idx];
                        return (
                            <>
                            {cell.startsWith("line") && <LineCell connected={connected} origin={origin} value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                            {cell.startsWith("corner") && <CornerCell connected={connected} origin={origin} value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                            {cell.startsWith("trio") && <TrioCell connected={connected} origin={origin} value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                            {cell === "quad-up-down-left-right" && <QuadCell connected={connected} origin={origin} key={idx}/>}
                            {cell.startsWith("end") && <EndCell connected={connected} origin={origin} value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                            </>
                        );
                    })}
                </div>
            </Frame>
            {win && <div className="netwalk__dialog">
                <Frame animate level={3} corners={6}>
                    <Heading node="h2">Victory!</Heading>
                    <Button layer="success" onClick={() => history.push("/netwalk")}>Play again</Button>
                </Frame>
            </div>}
            <div className="netwalk__details">
                <div>{timeString()}</div>
                <Button animate onClick={() => history.push("/")}>Return to menu</Button>
            </div>
        </div>
    );
}