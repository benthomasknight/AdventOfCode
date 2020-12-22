import { readFileSync } from 'fs';
import { addIndex, chain, compose, curry, filter, find, has, hasIn, length, map, max, reduce, sort, __ } from 'ramda';

const GetData = () => readFileSync('05/Input.txt').toString();
const GetRows = (data: string) => data.split('\n');

const SplitRowColumn = (s: string) => [s.substr(0, 7), s.substring(7)];

const ProcessCodes = (codes:string[]) => {
    const rowCode = codes[0].split('');
    const colCode = codes[1].split('');

    let currentRow = 0;
    let currentRowSize = 128/2;
    for (let i = 0; i < rowCode.length; i++) {
        if(rowCode[i] === 'B') currentRow+=currentRowSize;
        currentRowSize/=2;
    }

    let currentColumn = 0;
    let currentColumnSize = 8/2;
    for (let i = 0; i < colCode.length; i++) {
        if(colCode[i] === 'R') currentColumn+=currentColumnSize;
        currentColumnSize/=2;
    }

    return [
        currentRow,
        currentColumn,
    ]
}

const GetId = ([row, column]: number[]) => {
    return row * 8 + column;
}







/*compose(
    reduce(max, 0),
    map(GetId),
    map(ProcessCodes),
    map(SplitRowColumn),
    GetRows,
    GetData
)()*/

const findIndexed = addIndex<number, boolean>(find);

const process = compose(
    findIndexed((value: number, index: number, array) => {
        if(index > 0) {
            if(array[index - 1] !== value -1) {
                return true;
            }
        }
        return false;
    }),
    sort((a: number, b: number) => a - b),
    map(GetId),
    map(ProcessCodes),
    map(SplitRowColumn),
    GetRows,
    GetData
)()//?