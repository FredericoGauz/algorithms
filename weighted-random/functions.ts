export const openCurveFunction = (
    x: number,
    options: {
        inverted?: boolean;
        spread?: number;
        yTranslation?: number;
        xTranslation?: number;
        power?: number;
    }
) => {
    const {
        inverted = false,
        spread = 1 / 5,
        yTranslation = 1,
        xTranslation = 0,
        power = 2,
    } = options;
    return (
        (inverted ? -1 : 1) * (x - xTranslation) ** power * spread +
        yTranslation
    );
};

export const sharpBowFunction = (x: number) =>
    openCurveFunction(x, { spread: 1 / 1, yTranslation: 1 });

export const softBowFunction = (x: number) =>
    openCurveFunction(x, { spread: 1 / 5, yTranslation: 1 });

export const softMoundFunction = (x: number) =>
    openCurveFunction(x, { inverted: true, spread: 1 / 5, yTranslation: 1 });

export const sharpMoundFunction = (x: number) =>
    openCurveFunction(x, { inverted: true, spread: 1 / 1, yTranslation: 1 });

export const verySharpMoundFunction = (x: number) =>
    openCurveFunction(x, { inverted: true, spread: 1, yTranslation: 1 });

export const sinWave = (x: number) => Math.sin(x) + 1;

// export const sharpCubicMoundFunction = (x: number) =>
//     openCurveFunction(x, {
//         inverted: true,
//         power: 3,
//         spread: 1,
//         yTranslation: 1,
//     });
