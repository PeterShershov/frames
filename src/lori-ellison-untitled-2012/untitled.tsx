import { memo, useEffect, useRef, useState } from 'react';
import { Canvas } from '../commons/components/canvas/canvas';
import { randomEntryInArray, RNG } from '../commons/utils/random';
import { COLORS } from './constants';
import { generateQuadrilaterals } from './generate-quadrilaterals';

const seed = RNG(1);

interface UntitledProps {
	minWidth: number;
	minHeight: number;
	canvasHeight: number;
	canvasWidth: number;
	canvasBackground: string;
}

export const Untitled = memo<UntitledProps>(function Untitled({
	minHeight,
	minWidth,
	canvasHeight,
	canvasWidth,
	canvasBackground,
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [scale] = useState(1);

	useEffect(() => {
		if (canvasRef.current) {
			const context = canvasRef.current.getContext('2d');
			if (context) {
				draw({ scale, minWidth, minHeight, context, canvasRef });
			}
		}
	}, [minHeight, minWidth, scale, canvasHeight, canvasWidth]);

	return (
		<div style={{ background: canvasBackground, padding: '10px' }}>
			<Canvas height={canvasHeight} width={canvasWidth} canvasRef={canvasRef} />
		</div>
	);
});

function draw({
	canvasRef,
	context,
	minHeight,
	minWidth,
	scale,
}: {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	context: CanvasRenderingContext2D;
	scale: number;
	minHeight: number;
	minWidth: number;
}) {
	const animation = requestAnimationFrame(() => {
		const rhombuses = canvasRef.current
			? generateQuadrilaterals({
					containerWidth: canvasRef.current.width,
					containerHeight: canvasRef.current.height,
					minHeight,
					minWidth,
			  })
			: [];

		if (context && canvasRef.current) {
			context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			context.canvas.width = scale * canvasRef.current.width;
			context.canvas.height = scale * canvasRef.current.height;
			context.scale(scale, scale);
		}

		cancelAnimationFrame(animation);

		if (context) {
			for (const rhombusColumn of rhombuses) {
				for (const rhombus of rhombusColumn) {
					const { top, left, right, bottom } = rhombus;
					context.beginPath();
					context.lineWidth = 2;
					context.fillStyle = randomEntryInArray(COLORS, seed);
					context.strokeStyle = `rgba(33, 22, 10)`;
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
