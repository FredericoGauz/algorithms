import _ from "lodash";

export const getRandomWeightIndex = (weights: number[]) => {
    const cumulativeWeight = weights.reduce((p, v) => p + v, 0);
    let r = Math.floor(Math.random() * cumulativeWeight);
    for (let i = 0; i < weights.length; i++) {
        r -= weights[i];
        if (r < 0) return i;
    }
    return weights[weights.length - 1];
};

export const weightedRandomtests = () => {
    const weights = [3, 6, 1];
    const results = [0, 0, 0];
    const runTimes = 1000 * 1000;
    console.time("randomWeights");
    for (let i = 0; i < runTimes; i++) {
        results[getRandomWeightIndex(weights)!]++;
    }
    console.timeEnd("randomWeights");

    console.log(results);
};
