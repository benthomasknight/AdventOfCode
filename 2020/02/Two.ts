import { readFileSync } from 'fs';
import { compose, filter, length, map } from 'ramda';

const GetData = () => readFileSync('Two/Input.txt').toString();

const GetRows = (data: string) => data.split('\n');

const ValidateOne = (letter: string, min: number, max: number, password: string) => {
    const instances = password.split(letter).length - 1;

    return instances >= min && instances <= max;
}

const ValidateTwo = (letter: string, first: number, second: number, password: string) => {
    return (password[first - 1] === letter) !== (password[second - 1] === letter);
}

const IsValidOne = (row: string) => {
    const split = row.split(' ')
    const [min, max] = split[0].split('-');
    const letter = split[1][0];
    const password = split[2];

    return ValidateOne(letter, Number(min), Number(max), password);
}

const IsValidTwo = (row: string) => {
    const split = row.split(' ')
    const [first, second] = split[0].split('-');
    const letter = split[1][0];
    const password = split[2];

    return ValidateTwo(letter, Number(first), Number(second), password);
}

compose(
    length as any,
    filter((v: boolean) => v),
    map(IsValidOne),
    GetRows,
    GetData
)(undefined)//?

compose(
    length as any,
    filter((v: boolean) => v),
    map(IsValidTwo),
    GetRows,
    GetData
)(undefined)//?
