import React, { useState } from "react";

import "./NetWalk.css";

type NetWalkCell = 
    "origin-up" |
    "origin-left" |
    "origin-right" |
    "origin-down" |
    "line-vertical" |
    "line-horizontal";

type CellProps = {
    value: NetWalkCell;
    onChange: (value: NetWalkCell) => void;
}

function OriginCell({onChange, value}: CellProps) {
    const onClick = () => {
        switch(value){
            case "origin-left": onChange("origin-up");break;
            case "origin-up": onChange("origin-right");break;
            case "origin-right": onChange("origin-down");break;
            case "origin-down": onChange("origin-left");break;
        }
    };

    const radius = () =>  {
        switch(value){
            case "origin-left": return "0";
            case "origin-up": return "90";
            case "origin-right": return "180";
            case "origin-down": return "270";
        }
    };
    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={`rotate(${radius()}, 32, 32)`}>
                <line x1="0" y1="32" x2="32" y2="32" stroke="#00b7a1" stroke-width="24"/>
                <rect x="10" y="10" width="44" height="44" fill="#00b7a1"/>
            </g>
        </svg>
    )
}

function LineCell({onChange, value}: CellProps) {
    const onClick = () => {
        if(value === "line-vertical"){
            onChange("line-horizontal");
        }else{
            onChange("line-vertical");
        }
    };
    
    return (
        <svg viewBox="0 0 64 64" onClick={onClick}>
            <g transform={value === "line-vertical" ? "rotate(90, 32, 32)": ""}>
                <line x1="0" y1="32" x2="64" y2="32" stroke="#00b7a1" stroke-width="24"/>
            </g>
        </svg>
    );
}

export default function NetWalk(){
    const size = 5;
    const [grid, setGrid] = useState<NetWalkCell[]>(Array(size*size).fill("origin-up"));

    const onChangeCell = (idx: number, value: NetWalkCell) => {
        const newGrid = [...grid];
        newGrid.splice(idx, 1, value);
        setGrid(newGrid);
    };

    return (
        <div className="netwalk">
            <div className="netwalk__grid">
                {grid.map((cell, idx)=>{
                    return (
                        <>
                        {cell.startsWith("line") && <LineCell value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                        {cell.startsWith("origin") && <OriginCell value={cell} key={idx} onChange={(value) => onChangeCell(idx, value)}/>}
                        </>
                    );
                })}
            </div>
        </div>
    );
}