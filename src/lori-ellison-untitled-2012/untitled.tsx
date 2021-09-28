import { memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '../commons/components/canvas/canvas';
import { randomEntryInArray, RNG } from '../commons/utils/random';
import { COLORS } from './constants';
import { generateQuadrilaterals } from './generate-quadrilaterals';
import type { Quadrilaterals } from './types';

interface UntitledProps {
    minWidth: number;
    minHeight: number;
    canvasHeight: number;
    canvasWidth: number;
    canvasBackground: string;
    seed: ReturnType<typeof RNG>;
}

export const Untitled = memo<UntitledProps>(function Untitled({
    minHeight,
    minWidth,
    canvasHeight,
    canvasWidth,
    canvasBackground,
    seed,
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale] = useState(1);
    const quadrilateralsRef = useRef<Quadrilaterals[]>([]);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.fillStyle = canvasBackground;
                context.rect(0, 0, 33, 222);
                context.fill();

                draw({
                    seed,
                    scale,
                    context,
                    canvas: canvasRef.current,
                    quadrilaterals: quadrilateralsRef.current,
                });
            }
        }
    }, [canvasBackground, scale, seed]);

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                quadrilateralsRef.current = canvasRef.current
                    ? generateQuadrilaterals({
                          containerWidth: canvasRef.current.width,
                          containerHeight: canvasRef.current.height,
                          minHeight,
                          minWidth,
                          seed,
                      })
                    : [];

                draw({
                    seed,
                    scale,
                    context,
                    canvas: canvasRef.current,
                    quadrilaterals: quadrilateralsRef.current,
                });
            }
        }
    }, [minHeight, minWidth, scale, canvasHeight, canvasWidth, seed]);

    return (
        <div>
            <Canvas height={canvasHeight} width={canvasWidth} canvasRef={canvasRef} />
        </div>
    );
});

function draw({
    canvas,
    context,
    scale,
    quadrilaterals,
    seed,
}: {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    scale: number;
    quadrilaterals: Quadrilaterals[];
    seed: ReturnType<typeof RNG>;
}) {
    requestAnimationFrame(() => {
        if (context && canvas) {
            context.canvas.width = scale * canvas.width;
            context.canvas.height = scale * canvas.height;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.scale(scale, scale);
        }

        if (context) {
            for (const quadrilateralColumn of quadrilaterals) {
                for (const quadrilateral of quadrilateralColumn) {
                    const { top, left, right, bottom } = quadrilateral;
                    context.beginPath();
                    context.lineWidth = 2;
                    context.fillStyle = randomEntryInArray(COLORS, seed);
                    // top triangle
                    context.moveTo(top[0], top[1]);
                    context.lineTo(left[0], left[1]);
                    context.lineTo(right[0], right[1]);
                    // bottom triangle
                    context.moveTo(bottom[0], bottom[1]);
                    context.lineTo(left[0], left[1]);
                    context.lineTo(right[0], right[1]);

                    context.fill();
                    context.closePath();
                }
            }
        }
    });
}
