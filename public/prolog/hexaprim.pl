:- use_module(library(random)).
:- use_module(library(lists)).

% edge(point(x,y), point(x, y))

% Generates a minimum spanning tree for an hexagonal grid using Prim algorithm
prim(Origin, Grid) :-
    prim_tree([edge(_, Origin)], [], Grid).

prim_tree([], Grid, Grid).
prim_tree(InEdges, InGrid, FinalGrid) :-
    random_permutation(InEdges, ShuffleInEdges),
    ShuffleInEdges = [Edge|OutEdges1],
    OutGrid = [Edge|InGrid],
    remove_edges(Edge, OutEdges1, OutEdges2),
    append_edges(Edge, OutEdges2, OutGrid, OutEdges),
    prim_tree(OutEdges, OutGrid, FinalGrid).

remove_edges(edge(_, Point), InEdges, OutEdges) :-
    exclude(point_in_edge_dest(Point), InEdges, OutEdges).

point_in_edge_dest(Point, edge(_, Point)).

append_edges(Edge, InEdges, Grid, OutEdges) :-
    findall(NewEdge, (
        new_edge(Edge, NewEdge),
        NewEdge = edge(_, DstPoint),
        \+ member(edge(_, DstPoint), Grid)
    ), NewEdges),
    append(InEdges, NewEdges, OutEdges).

% Find new edges
% Test: new_edge(edge(_, point(2,2)), NewEdge).
% Up direction
up(point(X, Y), point(X, NewY)) :-
    NewY is Y-1,
    NewY > 0.
down(point(X, Y), point(X, NewY)) :-
    NewY is Y+1,
    size(Size),
    Limit is Size - X mod 2,
    NewY =< Limit.

upleft(point(X, Y), point(NewX, NewY)) :-
    NewX is X-1,
    NewY is Y-(1-X mod 2),
    NewX > 0,
    NewY > 0.

downleft(point(X, Y), point(NewX, NewY)) :-
    NewX is X-1,
    NewY is Y+X mod 2,
    NewX > 0,
    size(Size),
    Limit is Size - (1-X mod 2),
    NewY =< Limit.

upright(point(X, Y), point(NewX, NewY)) :-
    NewX is X+1,
    NewY is Y-(1-X mod 2),
    NewY > 0,
    size(Size),
    NewX =< Size.

downright(point(X, Y), point(NewX, NewY)) :-
    NewX is X+1,
    NewY is Y+X mod 2,
    size(Size),
    Limit is Size - (1-X mod 2),
    NewY =< Limit,
    NewX =< Size.

new_edge(edge(_, P1), edge(P1, P2)) :- up(P1, P2).
new_edge(edge(_, P1), edge(P1, P2)) :- down(P1, P2).
new_edge(edge(_, P1), edge(P1, P2)) :- upleft(P1, P2).
new_edge(edge(_, P1), edge(P1, P2)) :- downleft(P1, P2).
new_edge(edge(_, P1), edge(P1, P2)) :- upright(P1, P2).
new_edge(edge(_, P1), edge(P1, P2)) :- downright(P1, P2).


%%%

% Convert Prim grid to hexacell
% hexacell(point(x, y), Up, UpRight, DownRight, Down, DownLeft, UpLeft).

convert_grid_to_hexcell(Grid, HexCell) :-
    maplist(extract_points, Grid, Points),
    list_to_set(Points, PointsSet),
    maplist(convert_point(Grid), PointsSet, HexCell).

extract_points(edge(_, P2), P2).

connection(P1, P2, Grid) :- member(edge(P1, P2), Grid).
connection(P1, P2, Grid) :- member(edge(P2, P1), Grid).


convert_point(Grid, Point, hexacell(Point, Up, UpRight, DownRight, Down, DownLeft, UpLeft)) :-
    (up(Point, UpPoint), connection(Point, UpPoint, Grid) -> Up = true ; Up = false),
    (upright(Point, UpRightPoint), connection(Point, UpRightPoint, Grid) -> UpRight = true ; UpRight = false),
    (downright(Point, DownRightPoint), connection(Point, DownRightPoint, Grid) -> DownRight = true ; DownRight = false),
    (down(Point, DownPoint), connection(Point, DownPoint, Grid) -> Down = true ; Down = false),
    (downleft(Point, DownLeftPoint), connection(Point, DownLeftPoint, Grid) -> DownLeft = true ; DownLeft = false),
    (upleft(Point, UpLeftPoint), connection(Point, UpLeftPoint, Grid) -> UpLeft = true ; UpLeft = false).

% Generate Grid
generate_grid(X, Y, HexCell) :-
    prim(point(X, Y), Grid),
    last(Grid, edge(point(X, Y), point(X, Y))),
    convert_grid_to_hexcell(Grid, HexCell).


%% Solve Grid
% origin(point(1, 2)).
% hexacell(point(1, 1), false, false, false, true, false, false).
% hexacell(point(1, 2), true, false, false, false, false, false).

solve_grid_v0(Connected) :-
    findall(P1, (
        hexacell(P1, _, _, _, _, _,_),
        connected(P1)
    ), Connected).

connected(Point) :- origin(Point).
connected(Point) :- origin(Origin), connected(Origin, Point, []).

step_connect(P1, P2) :-
    hexacell(P1, true, _, _, _, _, _),
    hexacell(P2, _, _, _, true, _, _),
    up(P1, P2).

step_connect(P1, P2) :-
    hexacell(P1, _, true, _, _, _, _),
    hexacell(P2, _, _, _, _, true, _),
    upright(P1, P2).

step_connect(P1, P2) :-
    hexacell(P1, _, _, true, _, _, _),
    hexacell(P2, _, _, _, _, _, true),
    downright(P1, P2).

step_connect(P1, P2) :-
    hexacell(P1, _, _, _, true, _, _),
    hexacell(P2, true, _, _, _, _, _),
    down(P1, P2).

step_connect(P1, P2) :-
    hexacell(P1, _, _, _, _, true, _),
    hexacell(P2, _, true, _, _, _, _),
    downleft(P1, P2).

step_connect(P1, P2) :-
    hexacell(P1, _, _, _, _, _, true),
    hexacell(P2, _, _, true, _, _, _),
    upleft(P1, P2).

connected(P1, P1, _).
connected(P1, P2, Visited) :-
    step_connect(P1, P3, Visited),
    connected(P3, P2, [P1|Visited]).

solve_grid(Connected) :-
    origin(Origin),
    solve_grid([Origin], [], Connected).

%%% TEST DATA
% origin(point(3,3)).
% size(5).
% hexacell(point(2, 1), false, false, false, false, true, false).
% hexacell(point(5, 1), false, false, false, false, false, true).
% hexacell(point(2, 2), false, false, false, false, true, false).
% hexacell(point(4, 2), false, false, false, true, false, false).
% hexacell(point(1, 1), false, true, false, true, false, false).
% hexacell(point(4, 1), false, false, true, false, true, false).
% hexacell(point(5, 2), false, false, false, true, false, false).
% hexacell(point(1, 2), true, true, false, true, false, false).
% hexacell(point(3, 1), false, true, false, true, false, false).
% hexacell(point(2, 5), true, false, false, false, false, false).
% hexacell(point(5, 4), false, false, false, false, false, true).
% hexacell(point(4, 3), true, false, false, false, true, false).
% hexacell(point(5, 3), true, false, false, false, true, false).
% hexacell(point(4, 5), true, false, false, false, false, false).
% hexacell(point(1, 3), true, false, false, true, false, false).
% hexacell(point(3, 2), true, false, false, true, false, false).
% hexacell(point(4, 4), false, true, false, true, true, true).
% hexacell(point(1, 4), true, true, false, false, false, false).
% hexacell(point(2, 3), false, false, true, false, false, false).
% hexacell(point(2, 4), false, true, false, true, true, false).
% hexacell(point(3, 4), false, true, false, false, false, true).
% hexacell(point(3, 3), true, true, true, false, true, true).
%%% END TEST DATA
solve_grid_v1([], V, V).
solve_grid_v1([Point|Points], Visited, FinalConnected) :-
    findall(NewPoint, step_connect(Point, NewPoint, Visited), Connected),
    append(Connected, Points, AllPoints),
    solve_grid(AllPoints, [Point|Visited], FinalConnected).

solve_grid([], V, V).
solve_grid([Point|Points], InVisited, OutVisited) :-
    findall(NewPoint, (
        step_connect(Point, NewPoint),
        \+ member(NewPoint, InVisited)), NewPoints),
    append(Points, NewPoints, AllPoints),
    list_to_set(AllPoints, AllPointsSet),
    solve_grid(AllPointsSet, [Point|InVisited], OutVisited).
