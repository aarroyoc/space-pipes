import React, { useEffect, useState } from "react";

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
                {origin && <rect x="10" y="10" width="44" height="44" fill={connected ? connectedColor : noConnectedColor}/>}
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
                {origin && <rect x="10" y="10" width="44" height="44" fill={connected ? connectedColor : noConnectedColor}/>}
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
                {origin && <rect x="10" y="10" width="44" height="44" fill={connected ? connectedColor : noConnectedColor}/>}
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
                {origin && <rect x="10" y="10" width="44" height="44" fill={connected ? connectedColor : noConnectedColor}/>}
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
                {origin && <rect x="10" y="10" width="44" height="44" fill={connected ? connectedColor : noConnectedColor}/>}
            </g>
        </svg>
    );
}

export default function NetWalk(){
    const size = 5;
    const [grid, setGrid] = useState<NetWalkCell[]>([]);
    useEffect(()=>{
        const newGrid = generateGridPrim(size);
        setGrid(randomizeGrid(newGrid));
    }, [size]);

    const onChangeCell = (idx: number, value: NetWalkCell) => {
        const newGrid = [...grid];
        newGrid.splice(idx, 1, value);
        setGrid(newGrid);
    };

    const connections = grid.length === size*size ? calculateConnections(grid) : Array(size*size).fill(false);

    return (
        <div className="netwalk">
            <div className="netwalk__grid">
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
        </div>
    );
}