import { memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '../commons/components/canvas/canvas';
import { randomNumber, randomPointInCanvas, RNG } from '../commons/utils/random';

const seed = RNG(Math.random());
const startTime = Date.now();

interface Box {
    x: number;
    y: number;
    width: number;
    height: number;
}

const RECT_SIZE = 10;

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
            const boxes = createBoxes(canvasRef, 15, RECT_SIZE);
            const context = canvasRef.current.getContext('2d');
            if (context) {
                draw({ scale, context, canvas: canvasRef.current, boxes });
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
    canvas,
    context,
    scale,
    boxes,
}: {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    scale: number;
    boxes: Box[];
}) {
    requestAnimationFrame(() => {
        const t = (Date.now() - startTime) / 1000;
        if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.canvas.width = scale * canvas.width;
            context.canvas.height = scale * canvas.height;
            context.scale(scale, scale);
        }
        const arr = [-1, 1];

        if (context) {
            for (const [index, box] of boxes.entries()) {
                drawBox({
                    baseBox: box,
                    context,
                    offsetBox: boxes[index + 1],
                });
                const normalizedRange = (index / boxes.length) * 4;
                const x =
                    (normalizedRange * (Math.sin(t) * (canvas.width - RECT_SIZE / 2 - 6))) / 2 +
                    canvas.width / 2 -
                    RECT_SIZE / 2;
                const y = Math.abs(box.y + index * Math.sin(t) * 0.2 * arr[index % arr.length]);

                // if (x < 0) {
                //     box.x = Math.abs(x);
                // } else if (x > canvas.width) {
                //     box.x = canvas.width + canvas.width - x;
                // } else {
                //     box.x = x;
                // }

                // x = (((x - x_min) % (x_max - x_min)) + (x_max - x_min)) % (x_max - x_min) + x_min;
                // box.y = ((y % canvas.height) + canvas.height) % canvas.height;
                box.x = ((x % canvas.width) + canvas.width) % canvas.width;
                box.y = y;
            }
        }

        draw({ canvas, context, scale, boxes });
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
}: {
    context: CanvasRenderingContext2D;
    baseBox: Box;
    offsetBox?: Box;
}) {
    context.beginPath();
    context.strokeStyle = `hsl(20, ${randomNumber(50, 100, seed)}%, ${100 * 100 + 20}%)`;
    context.fillStyle = `hsla(221, ${randomNumber(50, 100, seed)}%, ${100 * 100}%,  0.2)`;

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
