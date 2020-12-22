import { readFile } from 'fs';
import { curry } from 'ramda';


const reduceToValueTwo = curry((value, prev, curr, index, arr) => {
    if(prev?.length > 0) {
        return prev;
    }

    const addToValue = arr.slice(index) //
        .filter(av => (av + curr) === value);

    if(addToValue.length > 0) {
        return [
            curr,
            addToValue[0]
        ];
    }
    return null;
});

const reduceTo2020Two = reduceToValueTwo(2020);

const reduceToValueThree = curry((value, prev, curr, index, arr) => {
    if(prev?.length > 0) {
        return prev;
    }


    const addToValue = arr.slice(index) //
        .map((av, i, arr2) => {
            const reduceToThird = reduceToValueTwo(value - av);
            return [
                av,
                ...(arr2.slice(i+1).reduce(reduceToThird, []) ?? [])
            ]
        }).filter(v => v.length > 2);

    if(addToValue.length > 0) {
        return addToValue[0]
    }
    return null;
});

const reduceThreeTo2020 = reduceToValueThree(2020);
const multiply = (prev, value) => prev * value;

readFile('oneInput.txt', 'utf8', (err, value) => {
    if(err) throw new Error("Failed to read file");
    
    value.split('\n').map(v => Number(v)).reduce(reduceThreeTo2020, []).reduce(multiply, 1)//?
});