import { style, classes, vars } from './frame.st.css';

interface FrameProps {
	className?: string;
	spacing?: boolean;
	spacingWidth?: number;
	frameWidth?: number;
	color?: string;
}

export const Frame: React.FC<FrameProps> = ({
	className,
	children,
	spacing,
	frameWidth = 0,
	spacingWidth = 0,
	color = 'black',
}) => {
	return (
		<div
			style={{
				[vars.spacingWidth]: `${spacingWidth}px`,
				[vars.frameWidth]: `${frameWidth}px`,
				[vars.color]: color,
			}}
			className={style(classes.root, { spacing }, className)}
		>
			{children}
		</div>
	);
};
