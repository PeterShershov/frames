export class RhombusFactory {
	draw(context: CanvasRenderingContext2D): void {
		context.beginPath();
		context.moveTo(2 + 10, 500);
		context.lineTo(2, 0);
		context.lineWidth = 3;
		context.stroke();
	}
}
