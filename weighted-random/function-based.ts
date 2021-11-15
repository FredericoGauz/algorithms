import _ from "lodash";
import memoizee from "memoizee";
import { getRandomWeightIndex } from ".";
import {
    verySharpMoundFunction,
    sharpMoundFunction,
    softBowFunction,
    softMoundFunction,
    sinWave,
} from "./functions";

const getNValuesForFunction = (
    func: (x: number) => number,
    min = -500,
    max = 500
) => {
    const values: number[] = [];

    // max inclusive
    for (let i = min * 10; i < max * 10 + 1; i += 10) {
        values.push(func(i));
    }
    return values;
};

const memoized = memoizee(getNValuesForFunction);
export const getRandomValueFromFunctionWeightDistribution = (
    // function to be used to extract weights
    func: (x: number) => number,
    // top number
    max: number,
    // bottom number
    min = 0
) => {
    const span = max - min;

    const weights = memoized(func, -span / 2, span / 2);
    const lowest = weights.reduce((p, v) => (v < p ? v : p), weights[0]);
    const paddedWeights =
        lowest < 0 ? weights.map((v) => v + Math.abs(lowest)) : weights;
    return getRandomWeightIndex(paddedWeights) + min;
};

export const randomValueFromFunctionTests = () => {
    const results: number[] = [];
    const runTimes = 1000;
    const max = 50;
    for (let i = 0; i < runTimes; i++) {
        const number = getRandomValueFromFunctionWeightDistribution(
            verySharpMoundFunction,
            max,
            0
        );
        results[number] = results[number] ? results[number] + 1 : 1;
    }
    console.log(`Total: ${results.length}`);
    results.map((v, i) =>
        console.log(
            `[${max / 2 - i}] => [${v}] ${Math.floor((v / runTimes) * 100)}%`
        )
    );
};
