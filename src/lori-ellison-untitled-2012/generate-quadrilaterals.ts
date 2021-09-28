import { last } from '../commons/utils/general';
import { randomNumber, RNG } from '../commons/utils/random';
import type { Quadrilateral, Quadrilaterals } from './types';

export function generateQuadrilaterals({
    containerHeight,
    containerWidth,
    minHeight,
    minWidth,
    seed,
}: {
    containerWidth: number;
    containerHeight: number;
    minWidth: number;
    minHeight: number;
    seed?: ReturnType<typeof RNG>;
}): Quadrilaterals[] {
    const quadrilaterals: Quadrilaterals[] = [[]];
    function createColumn(columnIndex: number) {
        if (!quadrilaterals[columnIndex]) {
            quadrilaterals.push([]);
        }

        if (columnIndex === 0) {
            quadrilaterals[columnIndex] = createFirstColumn({
                containerHeight,
                minWidth,
                minHeight,
                seed,
            });
        } else {
            quadrilaterals[columnIndex] = createSubsequentColumns({
                containerWidth,
                containerHeight,
                minHeight,
                minWidth,
                columnIndex,
                quadrilaterals,
                seed,
            });
        }
    }

    for (let i = 0; i <= containerWidth / minWidth; i++) {
        createColumn(i);
    }
    return quadrilaterals;
}

function createFirstColumn({
    containerHeight,
    minHeight,
    minWidth,
    seed,
}: {
    containerHeight: number;
    minWidth: number;
    minHeight: number;
    seed?: ReturnType<typeof RNG>;
}) {
    const numberOfRhombuses = containerHeight / minHeight;
    const column: Quadrilaterals = [];
    const firstRhombus: Quadrilateral = {
        top: [randomNumber(minWidth, minWidth + 2, seed) / 2, 0],
        bottom: [randomNumber(minWidth, minWidth + 2, seed) / 2, minHeight],
        left: [0, minHeight / 2],
        right: [randomNumber(minWidth, minWidth + 2, seed), minHeight / 2],
    };

    column.push(firstRhombus);

    for (let i = 1; i <= numberOfRhombuses; i++) {
        const lastRhombus = last(column);
        const nextRhombus: Quadrilateral = {
            top: lastRhombus.bottom,
            left: [lastRhombus.left[0], lastRhombus.bottom[1] + minHeight / 2],
            right: [
                lastRhombus.left[0] + minWidth,
                lastRhombus.bottom[1] + randomNumber(minHeight / 2 - 1, minHeight / 2 + 1, seed),
            ],
            bottom: [lastRhombus.bottom[0], lastRhombus.bottom[1] + minHeight],
        };

        if (nextRhombus.bottom[1] > containerHeight) {
            nextRhombus.bottom[1] = containerHeight;
        }

        if (
            nextRhombus.bottom[1] > containerHeight * 2 &&
            nextRhombus.bottom[1] < containerHeight
        ) {
            nextRhombus.left[1] = containerHeight;
            nextRhombus.right[1] = containerHeight;
            nextRhombus.bottom[1] = containerHeight;
        }

        column.push(nextRhombus);
    }

    return column;
}

function createSubsequentColumns({
    containerHeight,
    containerWidth,
    quadrilaterals,
    columnIndex,
    minWidth,
    minHeight,
    seed,
}: {
    containerWidth: number;
    containerHeight: number;
    columnIndex: number;
    quadrilaterals: Quadrilaterals[];
    minWidth: number;
    minHeight: number;
    seed?: ReturnType<typeof RNG>;
}) {
    const numberOfQuadrilateral = containerHeight / minHeight;
    const column = quadrilaterals[columnIndex];
    for (let i = 0; i <= numberOfQuadrilateral; i++) {
        const inPreviousColumn = quadrilaterals[columnIndex - 1][i];
        if (inPreviousColumn) {
            const lastRhombus = last(column);

            const rhombus: Quadrilateral = {
                top: lastRhombus?.bottom
                    ? lastRhombus.bottom
                    : [inPreviousColumn.top[0] + minWidth, inPreviousColumn.top[1]],
                bottom: [
                    inPreviousColumn.bottom[0] + randomNumber(minWidth - 1, minWidth + 1, seed),
                    inPreviousColumn.bottom[1],
                ],
                left: [inPreviousColumn.right[0], inPreviousColumn.left[1]],
                right: [inPreviousColumn.right[0] + minWidth, inPreviousColumn.right[1]],
            };

            if (rhombus.right[0] > containerWidth) {
                rhombus.right[0] = containerWidth;
            }

            column.push(rhombus);
        }
    }
    return column;
}
