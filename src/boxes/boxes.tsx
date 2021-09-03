import { memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '../commons/components/canvas/canvas';
import {
    randomEntryInArray,
    randomNumber,
    randomPointInCanvas,
    RNG,
} from '../commons/utils/random';

const seed = RNG(1);
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
const arr = Array.from({ length: 10 }, Math.random);

export const Boxes = memo<BoxesProps>(function Boxes({
    canvasHeight,
    canvasWidth,
    canvasBackground,
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [scale] = useState(1);

    useEffect(() => {
        if (canvasRef.current) {
            const boxes = createBoxes(canvasRef, 10, 20);
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
        const t = (Date.now() - startTime) / 1000;
        if (context && canvasRef.current) {
            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.canvas.width = scale * canvasRef.current.width;
            context.canvas.height = scale * canvasRef.current.height;
            context.scale(scale, scale);
        }
        const arr = [-1, 1];
        if (context) {
            console.log(t, Math.cos(t), Math.sin(t));
            for (const [index, box] of boxes.entries()) {
                //                            dis  startX
                box.x = index * Math.sin(t) * 50 + 600;
                box.y += index * Math.sin(t) * 0.05 * arr[index % arr.length];

                // box.y +=
                //     (Math.sin(t * Math.PI * 4 * arr[index]) * 1 + index * Math.sin(t) * 5 + 600) *
                //     0.002;
                //

                // box.y =
                //     Math.abs(Math.sin(t * Math.PI * 2 * arr[arr.length - 1 - index])) * 20 +
                //     index * Math.abs(Math.sin(t)) * 22 +
                //     11;

                // box.x += (Math.random() - 0.5) * 7;
                // box.y += (Math.random() - 0.5) * 7;

                drawBox({
                    baseBox: box,
                    context,
                    offsetBox: boxes[index + 1],
                });
            }
        }

        draw({ canvasRef, context, scale, boxes });
    });
}

function createBoxes(canvasRef: React.RefObject<HTMLCanvasElement>, numberOfBoxes = 1, size = 20) {
    const boxes: Box[] = [];

    for (let i = 1; i <= numberOfBoxes; i++) {
        const box: Partial<Box> = {};
        const randomPoint = randomPointInCanvas(canvasRef, seed);
        // const randomPoint = [randomNumber(20, 100), randomNumber(20, 100)];
        box.x = randomPoint[0];
        box.y = randomPoint[1];
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
}: {
    context: CanvasRenderingContext2D;
    baseBox: Box;
    offsetBox?: Box;
}) {
    context.beginPath();
    context.strokeStyle = `hsl(221, ${randomNumber(50, 100)}%, 70%)`;
    context.fillStyle = `hsla(221, ${randomNumber(50, 100)}%, 70%, 0.1)`;

    context.rect(x, y, width, height);
    context.stroke();
    context.fill();
    context.closePath();

    if (offsetBox) {
        context.moveTo(x, y);
        context.lineTo(offsetBox.x, offsetBox.y);
        context.moveTo(x + width, y);
        context.lineTo(offsetBox.x + width, offsetBox.y);
        context.closePath();
        context.moveTo(x, y + height);
        context.lineTo(offsetBox.x, offsetBox.y + height);
        context.moveTo(x + width, y + height);
        context.lineTo(offsetBox.x + width, offsetBox.y + height);
        context.closePath();
    }

    context.fill();
    context.stroke();
}
