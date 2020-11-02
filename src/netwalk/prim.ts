import { NetWalkCell } from "./celltypes";


export function generateGridPrim(size: number): NetWalkCell[]{
    const left = (idx: number): number | null => {
        if(idx % size === 0){
            return null;
        }else{
            return idx-1;
        }
    }
    const right = (idx: number): number | null => {
        if(idx % size === size-1){
            return null;
        }else{
            return idx+1;
        }
    }
    const up = (idx: number): number | null => {
        if(idx < size){
            return null;
        }else{
            return idx-size;
        }
    }
    const down = (idx: number): number | null => {
        if(idx >= size*(size-1)){
            return null;
        }else{
            return idx+size;
        }
    }
    const choice = (avail: any[][]): number => {
        return Math.floor(Math.random()*avail.length);
    }
    const adjacency = Array(Math.pow(size*size, 2)).fill(false);
    const adjacencyXY = (x: number, y: number) => y*size*size + x;
    const notConnected = (y: number) => adjacency.slice(y*size*size, (y+1)*size*size).every((v) => !v);
    const middle = Math.floor(size*size/2);
    let available = [[middle, up(middle)], [middle, down(middle)], [middle, left(middle)], [middle, right(middle)]];
    while(available.length > 0){
        const election = choice(available);
        const origin = available[election][0];
        const dest = available[election][1];
        
        if(origin !== null && dest !== null){
            available.splice(election, 1);
            adjacency[adjacencyXY(origin, dest)] = true;
            adjacency[adjacencyXY(dest, origin)] = true;

            available = available.filter((t) => {
                return t[1] !== dest;
            })

            const upCell = up(dest);
            if(upCell !== null && notConnected(upCell)){
                available.push([dest, upCell]);
            }

            const downCell = down(dest);
            if(downCell !== null && notConnected(downCell)){
                available.push([dest, downCell]);
            }

            const leftCell = left(dest);
            if(leftCell !== null && notConnected(leftCell)){
                available.push([dest, leftCell]);
            }

            const rightCell = right(dest);
            if(rightCell !== null && notConnected(rightCell)){
                available.push([dest, rightCell]);
            }
        }
    }
    const grid = Array(size*size).fill(true).map((_val: any, idx: number) => {
        const upCell = up(idx);
        const downCell = down(idx);
        const leftCell = left(idx);
        const rightCell = right(idx);
        if(upCell !== null && downCell !== null && leftCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, leftCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "quad-up-down-left-right"
        } else if(upCell !== null && downCell !== null && leftCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, leftCell)]){
            return "trio-up-left-down";
        } else if(upCell !== null && downCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "trio-up-right-down";
        } else if(upCell !== null && leftCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, leftCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "trio-left-up-right";
        } else if(downCell !== null && leftCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, leftCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "trio-left-down-right";
        } else if(upCell !== null && downCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, downCell)]){
            return "line-up-down";
        } else if(leftCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, leftCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "line-left-right";
        } else if(upCell !== null && leftCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, leftCell)]){
            return "corner-up-left";
        } else if(upCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, upCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "corner-up-right";
        } else if(downCell !== null && rightCell !== null && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, rightCell)]){
            return "corner-down-right";
        } else if(downCell !== null && leftCell !== null && adjacency[adjacencyXY(idx, downCell)] && adjacency[adjacencyXY(idx, leftCell)]){
            return "corner-down-left";
        } else if(upCell !== null && adjacency[adjacencyXY(idx, upCell)]){
            return "end-up";
        } else if(downCell !== null && adjacency[adjacencyXY(idx, downCell)]){
            return "end-down";
        } else if(leftCell !== null && adjacency[adjacencyXY(idx, leftCell)]){
            return "end-left";
        } else {
            return "end-right";
        }
    });
    return grid;
}

export function randomizeGrid(grid: NetWalkCell[]): NetWalkCell[]{
    return grid.map((cell) => {
        const rnd = Math.floor(Math.random()*4);
        if(cell.startsWith("trio")){
            const choices: NetWalkCell[] = ["trio-left-up-right", "trio-left-down-right", "trio-up-left-down", "trio-up-right-down"];
            return choices[rnd];
        }
        if(cell.startsWith("line")){
            const choices: NetWalkCell[] = ["line-left-right", "line-up-down", "line-left-right", "line-up-down"];
            return choices[rnd];
        }
        if(cell.startsWith("corner")){
            const choices: NetWalkCell[] = ["corner-up-right", "corner-down-left", "corner-up-left", "corner-down-right"];
            return choices[rnd];
        }
        if(cell.startsWith("end")){
            const choices: NetWalkCell[] = ["end-up", "end-down", "end-left", "end-right"];
            return choices[rnd];
        }
        return "quad-up-down-left-right";
    });
}