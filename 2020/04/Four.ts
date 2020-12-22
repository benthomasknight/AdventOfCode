import { readFileSync } from 'fs';
import { chain, compose, curry, filter, has, hasIn, length, map, __ } from 'ramda';

const GetData = () => readFileSync('04/Input.txt').toString();
const GetRows = (data: string) => data.split('\n\n')
const SplitByWhitespace = (data: string) => compose(
    chain((v: string) => v.split(' '))
)(data.split('\n'));


const parseInputs = (data: string) => {
    const parts = SplitByWhitespace(data);

    return parts.reduce((p, c) => ({
        ...p,
        [c.split(':')[0]]: c.split(':')[1]
    }), {});
}

const HasRequiredKeys = curry((keys: string[], obj: any) => {
    if(obj === false) {
        return false;
    }

    const objHas = has(__, obj);
    const isValid = keys.every(v => objHas(v));

    if(isValid) {
        return obj;
    }
    return false;
})

const ValidateData = (obj: any) => {
    if(obj === false) {
        return false;
    }

    obj;//?

    const NumberValidation = curry((length, min, max, v) => v?.length === length && Number(v) >= min && Number(v) <= max);
    const BYR = NumberValidation(4, 1920, 2002);
    const IYR = NumberValidation(4, 2010, 2020);
    const EYR = NumberValidation(4, 2020, 2030);

    const CMS = (v: string) => v?.endsWith('cm') && NumberValidation(3, 150, 193, v.substr(0, 3));
    const INS = (v: string) => v?.endsWith('in') && NumberValidation(2, 59, 76, v.substr(0, 2));
    const HGT = (v: string) => CMS(v) || INS(v);

    const HCL = (v: string) => v?.match(/^#[a-f0-9]{6}$/) !== null;
    const ECL = (v: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(v) !== -1;
    const PID = (v: string) => v?.match(/^[0-9]{9}$/) !== null;

    return BYR(obj.byr)
        && IYR(obj.iyr)
        && EYR(obj.eyr)
        && HGT(obj.hgt)
        && HCL(obj.hcl)
        && ECL(obj.ecl)
        && PID(obj.pid)
        && obj //?
        && true;
}

const process = compose(
    length as any,
    filter((v: boolean) => v),
    map(ValidateData),
    map(HasRequiredKeys(['byr','iyr','eyr','hgt','hcl','ecl','pid'])),
    map(parseInputs),
    GetRows,
    GetData
)()//?