import { readFileSync } from 'fs';
import { addIndex, chain, compose, curry, filter, find, has, hasIn, length, map, max, reduce, sort, __, sum } from 'ramda';

const GetData = () => readFileSync('06/Input.txt').toString();
const GetRows = (data: string) => data.split('\n\n');

const options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const CountResponses = (row: string) => options.map(v => row.indexOf(v) !== -1).filter(v => v).length;
/* 
compose(
    sum,
    map(CountResponses),
    GetRows,
    GetData
); */


const CountResponsesTwo = (row: string) => {
    const arrs = row.split('\n').map(v => new Set(v.split('')));
    
    let intersection = [...options];
    for(let i = 0; i < arrs.length; i++) {
        intersection = intersection.filter(v => arrs[i].has(v));
    }

    return intersection;
}
compose(
    sum,
    map(length as any),
    map(CountResponsesTwo),
    GetRows,
    GetData
)();//?