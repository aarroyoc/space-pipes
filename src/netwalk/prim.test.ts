import { NetWalkCell } from "./celltypes";
import { generateGridPrim, randomizeGrid } from "./prim";

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
});

afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
})

test("randomizeGrid test 1, 5x5", () => {
    const grid: NetWalkCell[] = [
        "end-right",
        "corner-down-left",
        "corner-down-right",
        "trio-left-down-right",
        "corner-down-left",
        "end-down",
        "line-up-down",
        "line-up-down",
        "end-up",
        "line-up-down",
        "corner-up-right",
        "quad-up-down-left-right",
        "quad-up-down-left-right",
        "end-left",
        "end-up",
        "end-right",
        "trio-up-left-down",
        "corner-up-right",
        "line-left-right",
        "corner-down-left",
        "end-right",
        "trio-left-up-right",
        "end-left",
        "end-right",
        "corner-up-left"
    ];
    
    const expected: NetWalkCell[] = [
        "end-up",
        "corner-up-right",
        "corner-up-right",
        "trio-left-up-right",
        "corner-up-right",
        "end-up",
        "line-left-right",
        "line-left-right",
        "end-up",
        "line-left-right",
        "corner-up-right",
        "quad-up-down-left-right",
        "quad-up-down-left-right",
        "end-up",
        "end-up",
        "end-up",
        "trio-left-up-right",
        "corner-up-right",
        "line-left-right",
        "corner-up-right",
        "end-up",
        "trio-left-up-right",
        "end-up",
        "end-up",
        "corner-up-right"
    ];

    const result = randomizeGrid(grid);
    expect(result).toEqual(expected);
});

test("generateGridPrim test 1, 5x5", () => {
    const expected = [
        'end-right',
        'line-left-right',
        'trio-left-down-right',
        'line-left-right',
        'end-left',
        'end-right',
        'line-left-right',
        'quad-up-down-left-right',
        'line-left-right',
        'end-left',
        'end-right',
        'line-left-right',
        'quad-up-down-left-right',
        'line-left-right',
        'end-left',
        'end-right',
        'line-left-right',
        'quad-up-down-left-right',
        'line-left-right',
        'end-left',
        'end-right',
        'line-left-right',
        'trio-left-up-right',
        'line-left-right',
        'end-left'
    ];
    const result = generateGridPrim(5);
    expect(result).toEqual(expected);
});