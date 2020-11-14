import { calculateConnections } from "./solver";

test("calculateConnections test 1, 5x5", () => {
    const grid = [
        {
          "x": 2,
          "y": 2,
          "up": true,
          "upright": false,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 4,
          "y": 2,
          "up": false,
          "upright": false,
          "downright": true,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 5,
          "y": 1,
          "up": false,
          "upright": false,
          "downright": false,
          "down": true,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 4,
          "y": 1,
          "up": false,
          "upright": false,
          "downright": true,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 1,
          "y": 2,
          "up": false,
          "upright": false,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": true
        },
        {
          "x": 1,
          "y": 1,
          "up": false,
          "upright": false,
          "downright": true,
          "down": true,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 1,
          "y": 3,
          "up": false,
          "upright": false,
          "downright": false,
          "down": false,
          "downleft": true,
          "upleft": false
        },
        {
          "x": 2,
          "y": 1,
          "up": true,
          "upright": false,
          "downright": false,
          "down": false,
          "downleft": true,
          "upleft": false
        },
        {
          "x": 5,
          "y": 4,
          "up": false,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 3,
          "y": 1,
          "up": true,
          "upright": false,
          "downright": true,
          "down": false,
          "downleft": true,
          "upleft": false
        },
        {
          "x": 1,
          "y": 4,
          "up": false,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 2,
          "y": 3,
          "up": false,
          "upright": false,
          "downright": true,
          "down": true,
          "downleft": false,
          "upleft": true
        },
        {
          "x": 4,
          "y": 5,
          "up": false,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": true
        },
        {
          "x": 4,
          "y": 4,
          "up": false,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 5,
          "y": 3,
          "up": true,
          "upright": false,
          "downright": false,
          "down": false,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 3,
          "y": 2,
          "up": true,
          "upright": false,
          "downright": true,
          "down": false,
          "downleft": true,
          "upleft": false
        },
        {
          "x": 5,
          "y": 2,
          "up": true,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": true,
          "upleft": true
        },
        {
          "x": 4,
          "y": 3,
          "up": false,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": true,
          "upleft": true
        },
        {
          "x": 2,
          "y": 4,
          "up": false,
          "upright": false,
          "downright": true,
          "down": false,
          "downleft": false,
          "upleft": true
        },
        {
          "x": 2,
          "y": 5,
          "up": false,
          "upright": false,
          "downright": false,
          "down": true,
          "downleft": false,
          "upleft": false
        },
        {
          "x": 3,
          "y": 4,
          "up": true,
          "upright": false,
          "downright": true,
          "down": true,
          "downleft": true,
          "upleft": false
        },
        {
          "x": 3,
          "y": 3,
          "up": true,
          "upright": true,
          "downright": false,
          "down": false,
          "downleft": true,
          "upleft": false
        }
    ];
    const connectedExpected = new Set(["3,3", "4,3", "3,2", "5,2", "4,2", "5,1"]);
    const connected = calculateConnections(grid, 3, 3);
    expect(connected).toEqual(connectedExpected);
});