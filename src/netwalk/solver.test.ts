import { NetWalkCell } from "./celltypes";
import { calculateConnections } from "./solver";

test("calculateConnections test 1, 5x5", () => {
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
    const expectedResult = Array(25).fill(true);

    const result = calculateConnections(grid);
    expect(result).toEqual(expectedResult);
});

test("calculateConnections test 2, 5x5", () => {
    const grid: NetWalkCell[] = [
        'end-left',
        'end-up',
        'corner-up-left',
        'end-up',
        'end-up',
        'corner-down-left',
        'line-up-down',
        'trio-up-left-down',
        'trio-up-right-down',
        'trio-up-left-down',
        'end-down',
        'trio-up-left-down',
        'quad-up-down-left-right',
        'corner-up-left',
        'line-up-down',
        'end-right',
        'trio-left-up-right',
        'trio-up-right-down',
        'end-down',
        'end-left',
        'end-right',
        'corner-down-left',
        'corner-up-left',
        'line-up-down',
        'end-down'
    ];
    const expectedResult = [
        false, false, false, false,
        false, false, false, true,
        true,  true,  false, false,
        true,  true,  true,  false,
        false, true,  false, false,
        false, false, true,  false,
        false
    ];

    const result = calculateConnections(grid);
    expect(result).toEqual(expectedResult);
});