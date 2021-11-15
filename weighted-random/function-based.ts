import { getRandomWeightIndex } from ".";

const invertedOpenCurve = (
    x: number,
    options: {
        spread?: number;
        yTranslation?: number;
        xTranslation?: number;
    }
) => {
    const { spread = 5, yTranslation = 1, xTranslation = 0 } = options;
    return (x - xTranslation) ** 2 / spread + yTranslation;
};

const getValuesForFunction = (
    func: (x: number) => number,
    min = -50,
    max = 50
) => {
    const values: number[] = [];

    // max inclusive
    for (let i = min; i < max + 1; i++) {
        values.push(func(i));
    }
    return values;
};

export const getRandomValueFromFunction = (
    func: (x: number) => number,
    max: number,
    min = 0
) => {
    const span = max - min;

    // TODO: memoize that
    const weights = getValuesForFunction(func, -span / 2, span / 2);
    return getRandomWeightIndex(weights) + min;
};

export const randomValueFromFunctionTests = () => {
    const results: number[] = [];
    const runTimes = 1000 * 1000;
    for (let i = 0; i < runTimes; i++) {
        const number = getRandomValueFromFunction(
            (x) => invertedOpenCurve(x, { spread: 5, yTranslation: 1 }),
            10,
            0
        );
        results[number] = results[number] ? results[number] + 1 : 1;
    }
    results.map((v, i) =>
        console.log(
            `[${10 / 2 - i}] => [${v}] ${Math.floor((v / runTimes) * 100)}%`
        )
    );
};
