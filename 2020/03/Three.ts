import { readFileSync } from 'fs';
import { addIndex, compose, curry, filter, length, map } from 'ramda';

const GetData = () => readFileSync('03/Input.txt').toString();
const GetRows = (data: string) => data.split('\n');

const GetNextIndexAny = curry((width, right, down, [x, y]) => {
    return [
        (x+right) % width,
        y + down
    ];
});

const R1D1 = GetNextIndexAny(31, 1, 1);
const R3D1 = GetNextIndexAny(31, 3, 1);
const R5D1 = GetNextIndexAny(31, 5, 1);
const R7D1 = GetNextIndexAny(31, 7, 1);
const R1D2 = GetNextIndexAny(31, 1, 2);

const AddMarker = (indexer: Function, pos: [x: number, y: number]) => (row: string, i: number) => {
    if(i === 0) return (row[0] === '#' ? 'X': 'O') + row.substring(1)
    const [newX, newY] = indexer(pos);

    if(i !== newY) {
        return row;
    }

    pos[0] = newX;
    pos[1] = newY;

    const mark = row[pos[0]] === '#' ? 'X' : 'O';

    return row.substr(0, pos[0]) + mark + row.substr(pos[0] + 1);
}

const indexedMap = addIndex<string, string>(map);

const RowHasChar = curry((char: string, row: string) => {
    return row.indexOf(char) !== -1;
});

const RowHasX = RowHasChar('X');

const r1d1 = compose(
    length as any,
    filter<string>(RowHasX),
    indexedMap<any, any, any>(AddMarker(R1D1, [0,0])),
    GetRows,
    GetData
);

const r3d1 = compose(
    length as any,
    filter<string>(RowHasX),
    indexedMap<any, any, any>(AddMarker(R3D1, [0,0])),
    GetRows,
    GetData
);
const r5d1 = compose(
    length as any,
    filter<string>(RowHasX),
    indexedMap<any, any, any>(AddMarker(R5D1, [0,0])),
    GetRows,
    GetData
);
const r7d1 = compose(
    length as any,
    filter<string>(RowHasX),
    indexedMap<any, any, any>(AddMarker(R7D1, [0,0])),
    GetRows,
    GetData
);

const r1d2 = compose(
    length as any,
    filter<string>(RowHasX),
    indexedMap<any, any, any>(AddMarker(R1D2, [0,0])),
    GetRows,
    GetData
)
const res = r1d1() * r3d1() * r5d1() * r7d1() * r1d2(); //?

