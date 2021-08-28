export function RNG(seed: number): () => number {
	// LCG using GCC's constants
	const m = 0x80000000; // 2**31;
	const a = 1103515245;
	const c = 12345;
	let state = seed ? seed : Math.floor(Math.random() * (m - 1));

	return function () {
		return (state = (a * state + c) % m) / (m - 1);
	};
}

export function randomNumber(min: number, max: number, seed?: ReturnType<typeof RNG>): number {
	const randomFunction = seed || Math.random;
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(randomFunction() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function randomPointInCanvas(
	canvasRef: React.RefObject<HTMLCanvasElement>,
	seed?: ReturnType<typeof RNG>
): [number, number] {
	const randomFunction = seed || Math.random;

	if (!canvasRef.current) {
		return [0, 0];
	}
	return [
		randomNumber(0, canvasRef.current.width || 0, randomFunction),
		randomNumber(0, canvasRef.current.height || 0, randomFunction),
	];
}

export function randomEntryInArray<T>(array: T[], seed?: ReturnType<typeof RNG>): T {
	return array[randomNumber(0, array.length - 1, seed)];
}
