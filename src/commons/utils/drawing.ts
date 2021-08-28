export function drawLine(
	context: CanvasRenderingContext2D,
	from: number[],
	to: number[],
	options?: { lineWidth?: number; strokeStyle?: string }
): void {
	context.beginPath();
	context.lineWidth = options?.lineWidth || 1;
	context.strokeStyle = options?.strokeStyle || `rgba(33, 22, 10)`;
	context.moveTo(from[0], from[1]);
	context.lineTo(to[0], to[1]);
	context.stroke();
	context.closePath();
}

export function resolveLineNextSegmentPoint(from: number, to: number): number {
	if (from < to) {
		return from + 1;
	} else if (from > to) {
		return from - 1;
	} else {
		return from;
	}
}

export function drawLineSegments(
	context: CanvasRenderingContext2D,
	from: number[],
	to: number[],
	done?: () => void
): void {
	function draw() {
		const animation = requestAnimationFrame(() => {
			cancelAnimationFrame(animation);
			const x = resolveLineNextSegmentPoint(from[0], to[0]);
			const y = resolveLineNextSegmentPoint(from[1], to[1]);

			drawLine(context, from, [x, y]);
			if (from[0] !== to[0] || from[1] !== to[1]) {
				from = [x, y];
			} else {
				done?.();
			}
		});
	}

	setInterval(draw, 1);
}
