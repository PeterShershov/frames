import { memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '../commons/components/canvas/canvas';
import {
    randomEntryInArray,
    randomNumber,
    randomPointInCanvas,
    RNG,
} from '../commons/utils/random';

const seed = RNG(Math.random());
const startTime = Date.now();

interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface BoxesProps {
    canvasHeight: number;
    canvasWidth: number;
    canvasBackground: string;
}
export const Boxes = memo<BoxesProps>(function Boxes({
    canvasHeight,
    canvasWidth,
    canvasBackground,
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale] = useState(1);

    useEffect(() => {
        if (canvasRef.current) {
            const boxes = createBoxes(canvasRef, 60, 10);
            const context = canvasRef.current.getContext('2d');
            if (context) {
                draw({ scale, context, canvasRef, boxes });
            }
        }
    }, [scale, canvasHeight, canvasWidth]);

    return (
        <div style={{ background: canvasBackground, padding: '10px' }}>
            <Canvas height={canvasHeight} width={canvasWidth} canvasRef={canvasRef} />
        </div>
    );
});

function draw({
    canvasRef,
    context,
    scale,
    boxes,
}: {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    context: CanvasRenderingContext2D;
    scale: number;
    boxes: Box[];
}) {
    requestAnimationFrame(() => {
        const t = (Date.now() - startTime) / 3000;
        if (context && canvasRef.current) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.canvas.width = scale * canvasRef.current.width;
            context.canvas.height = scale * canvasRef.current.height;
            context.scale(scale, scale);
        }
        const arr = [-1, 1];
        if (context) {
            for (const [index, box] of boxes.entries()) {
                drawBox({
                    baseBox: box,
                    context,
                    offsetBox: boxes[index + 1],
                    index,
                });

                const intX = index * Math.sin(t) * 30 + canvasRef.current!.width / 2;
                const x = Math.abs(intX);
                const y = Math.abs(box.y + index * Math.sin(t) * 0.02 * arr[index % arr.length]);

                if (canvasRef.current && x > canvasRef.current.width - 20) {
                    const shiftedX =
                        Math.abs(intX) -
                        (x - canvasRef.current.width) -
                        31 -
                        index * Math.sin(t) * 30 +
                        canvasRef.current.width / 2;
                    box.x = Math.abs(shiftedX);
                } else {
                    box.x = x;
                }
                if (canvasRef.current && y > canvasRef.current.height - 20) {
                    const shiftedY =
                        Math.abs(box.y + index * Math.sin(t) * 0.02 * arr[index % arr.length]) -
                        (y - canvasRef.current.height) -
                        21 -
                        index * Math.sin(t) * 0.02 * arr[index % arr.length];

                    box.y = shiftedY;
                } else {
                    box.y = y;
                }
            }
        }

        draw({ canvasRef, context, scale, boxes });
    });
}

function createBoxes(canvasRef: React.RefObject<HTMLCanvasElement>, numberOfBoxes = 1, size = 20) {
    const boxes: Box[] = [];
    for (let i = 1; i <= numberOfBoxes; i++) {
        const box: Partial<Box> = {};
        const point = randomPointInCanvas(canvasRef, 20);
        box.x = point[0];
        box.y = point[1];
        box.width = size;
        box.height = size;

        boxes.push(box as Box);
    }

    return boxes;
}

function drawBox({
    context,
    baseBox: { x, y, width, height },
    offsetBox,
    index,
}: {
    index: number;
    context: CanvasRenderingContext2D;
    baseBox: Box;
    offsetBox?: Box;
}) {
    context.beginPath();
    context.strokeStyle = `hsl(20, ${randomNumber(50, 100, seed)}%, ${(index / 100) * 100 + 20}%)`;
    context.fillStyle = `hsla(221, ${randomNumber(50, 100, seed)}%, ${(index / 100) * 100}%,  0.2)`;

    context.rect(x, y, width, height);
    context.stroke();
    context.fill();
    context.closePath();

    if (offsetBox) {
        context.moveTo(offsetBox.x, offsetBox.y);
        context.lineTo(x, y);
        context.moveTo(offsetBox.x + width, offsetBox.y);
        context.lineTo(x + width, y);
        context.closePath();
        context.moveTo(offsetBox.x, offsetBox.y + height);
        context.lineTo(x, y + height);
        context.moveTo(offsetBox.x + width, offsetBox.y + height);
        context.lineTo(x + width, y + height);
        context.closePath();
    }

    context.fill();
    context.stroke();
}
