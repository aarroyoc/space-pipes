import { NetWalkCell } from "./celltypes";

export function calculateConnections(grid: NetWalkCell[]): boolean[]{
    const size = Math.sqrt(grid.length);
    const connections = Array(grid.length).fill(false);

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
    };
    const middle = Math.floor(grid.length / 2);
    connections[middle] = true;
    let checklist = [[middle, up(middle)], [middle, down(middle)], [middle, left(middle)], [middle, right(middle)]];
    while(checklist.length > 0){
        let element = checklist.pop();
        if(element){
            // Check connection
            const origin = element[0];
            const dest = element[1];

            if(origin !== null && dest !== null){
                if(dest === up(origin) && grid[origin].includes("up") && grid[dest].includes("down")){
                    connections[dest] = true;
                }
                if(dest === down(origin) && grid[origin].includes("down") && grid[dest].includes("up")){
                    connections[dest] = true;
                }
                if(dest === left(origin) && grid[origin].includes("left") && grid[dest].includes("right")){
                    connections[dest] = true;
                }
                if(dest === right(origin) && grid[origin].includes("right") && grid[dest].includes("left")){
                    connections[dest] = true;
                }

                if(connections[dest]){
                    // Add new to checklist
                    const upCell = up(dest);
                    if(grid[dest].includes("up") && upCell !== null && connections[upCell] === false && origin !== upCell){
                        checklist.push([dest, upCell]);
                    }
                    const leftCell = left(dest);
                    if(grid[dest].includes("left") && leftCell !== null && connections[leftCell] === false && origin !== leftCell){
                        checklist.push([dest, leftCell]);
                    }
                    const downCell = down(dest);
                    if(grid[dest].includes("down") && downCell !== null && connections[downCell] === false && origin !== downCell){
                        checklist.push([dest, downCell]);
                    }
                    const rightCell = right(dest);
                    if(grid[dest].includes("right") && rightCell !== null && connections[rightCell] === false && origin !== rightCell){
                        checklist.push([dest, rightCell]);
                    }
                }
            }
        }
    }
    return connections;
}