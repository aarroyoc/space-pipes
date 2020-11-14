import { HexaCellData } from "./celldata";

export function calculateConnections(grid: HexaCellData[], originX: number, originY: number): Set<string>{
    const connected: Set<string> = new Set();
    connected.add(`${originX},${originY}`);
    const checklist: HexaCellData[] = [];
    const origin = grid.find(t => t.x === originX && t.y === originY);
    if(origin){
        checklist.push(origin);
        while(checklist.length > 0){
            const src = checklist.pop();
            if(src){
                grid.forEach((dest)=>{
                    if(connected.has(`${dest.x},${dest.y}`)){
                        return;
                    }

                    if((dest.x === src.x && dest.y === src.y-1 && dest.down && src.up) || 
                       (dest.x === src.x && dest.y === src.y+1 && dest.up && src.down) ||
                       (dest.x === src.x-1 && dest.y === src.y-(dest.x % 2) && dest.downright && src.upleft) ||
                       (dest.x === src.x-1 && dest.y === src.y+(src.x % 2) && dest.upright && src.downleft) ||
                       (dest.x === src.x+1 && dest.y === src.y-(dest.x % 2) && dest.downleft && src.upright) ||
                       (dest.x === src.x+1 && dest.y === src.y+(src.x % 2) && dest.upleft && src.downright)){
                        connected.add(`${dest.x},${dest.y}`);
                        checklist.push(dest);
                    }
                });
            }
        }
    }
    return connected;
}