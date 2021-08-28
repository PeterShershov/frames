import type { CanvasHTMLAttributes } from 'react';
import { classes, style } from './canvas.st.css';

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> {
	canvasRef: React.RefObject<HTMLCanvasElement>;
}
export const Canvas: React.VFC<CanvasProps> = ({ className, canvasRef, ...props }) => {
	// useEffect(() => {
	// 	if (canvasRef.current) {
	// 		canvasRef.current
	// 			.getContext('2d')
	// 			?.scale(window.devicePixelRatio, window.devicePixelRatio);
	// 	}
	// }, [canvasRef]);

	return <canvas ref={canvasRef} className={style(classes.root, className)} {...props} />;
};
