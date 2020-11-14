import fs from "fs";

// @ts-ignore
import pl from "tau-prolog";

import { calculateConnections } from "./solver";

test("generate 3x3 hexagrid prolog", () => {
    const prologCode = fs.readFileSync("public/prolog/hexaprim.pl", "utf-8");
    const session = pl.create(100000);
    session.consult(prologCode);
    session.query("assertz(origin(point(2, 2))), assertz(size(3)), generate_grid(2, 2, HexCell).");
    session.answer((x: any) => {
        const result = pl.format_answer(x);
        const regex = new RegExp(/hexacell\(point\((\d),(\d)\),(true|false),(true|false),(true|false),(true|false),(true|false),(true|false)\)/g);
        let m;
        const grid = [];
        do{
            m = regex.exec(result);
            if(m){
                grid.push({
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
        const connected = calculateConnections(grid, 2, 2);
        expect(connected.size).toBe(7);
    });
});

test("generate 5x5 hexagrid prolog", () => {
    const prologCode = fs.readFileSync("public/prolog/hexaprim.pl", "utf-8");
    const session = pl.create(100000);
    session.consult(prologCode);
    session.query("assertz(origin(point(3, 3))), assertz(size(5)), generate_grid(3, 3, HexCell).");
    session.answer((x: any) => {
        const result = pl.format_answer(x);
        const regex = new RegExp(/hexacell\(point\((\d),(\d)\),(true|false),(true|false),(true|false),(true|false),(true|false),(true|false)\)/g);
        let m;
        const grid = [];
        do{
            m = regex.exec(result);
            if(m){
                grid.push({
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
        const connected = calculateConnections(grid, 3, 3);
        expect(connected.size).toBe(22);
    });
});

test("generate 7x7 hexagrid prolog", () => {
    const prologCode = fs.readFileSync("public/prolog/hexaprim.pl", "utf-8");
    const session = pl.create(100000);
    session.consult(prologCode);
    session.query("assertz(origin(point(4, 4))), assertz(size(7)), generate_grid(4, 4, HexCell).");
    session.answer((x: any) => {
        const result = pl.format_answer(x);
        const regex = new RegExp(/hexacell\(point\((\d),(\d)\),(true|false),(true|false),(true|false),(true|false),(true|false),(true|false)\)/g);
        let m;
        const grid = [];
        do{
            m = regex.exec(result);
            if(m){
                grid.push({
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
        const connected = calculateConnections(grid, 4, 4);
        expect(connected.size).toBe(45);
    });
});