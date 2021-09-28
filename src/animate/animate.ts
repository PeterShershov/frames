enum Easing {
    Linear,
}

function animatePosition<T extends Record<string, number>>({
    boomerang,
    cycles,
    duration,
    update,
    easing,
    path,
}: {
    cycles: number;
    easing: Easing;
    path: T[];
    duration: number;
    boomerang: boolean;
    update: (point: T) => void;
}): void {
    const startTime = Date.now();
    const timePerStep = duration / path.length;
    const totals: Record<keyof T, number> = {} as Record<keyof T, number>;

    for (const entry of path) {
        for (const [key, value] of Object.entries(entry)) {
            totals[key as keyof T] = totals[key] ? Math.abs(totals[key] - value) : value;
        }
    }

    function draw() {
        requestAnimationFrame(() => {
            const currentDuration = Date.now() - startTime;
            const currentStep = Math.floor(currentDuration / timePerStep);
            if (currentStep >= path.length) {
                return;
            }

            const currentPoint = path[currentStep];
            const nextPoint = path[currentStep + 1];

            const xDistance = Math.abs(nextPoint.x - currentPoint.x);
            const yDistance = Math.abs(nextPoint.y - currentPoint.y);

            const xStepDuration = xDistance / timePerStep;
            const yStepDuration = yDistance / timePerStep;

            const newPoint = {};

            update();
            draw();
        });
    }
}

function getTotal([firstElement, ...rest]: number[]) {
    let total = 0;
    let previousItem = firstElement;
    for (const item of rest) {
        total += Math.abs(previousItem - item);
        previousItem = item;
    }

    return total;
}

export function groupBy<T, K extends keyof T>(elements: T[], property: K): Map<T[K], T[]> {
    return elements.reduce((acc, element) => {
        const propertyValue = acc.get(element[property]);

        if (propertyValue) {
            propertyValue.push(element);
        } else {
            acc.set(element[property], [element]);
        }

        return acc;
    }, new Map());
}
