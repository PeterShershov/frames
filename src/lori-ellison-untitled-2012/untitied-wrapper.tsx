import { ChangeEventHandler, memo, useEffect, useState } from 'react';
import { Frame } from '../commons/components/frame/frame';
import { randomNumber } from '../commons/utils/random';
import { MIN_RHOMBUS_HEIGHT, MIN_RHOMBUS_WIDTH } from './constants';
import { Untitled } from './untitled';
import { classes } from './untitled-wrapper.st.css';

export const UntitledWrapper = memo(function UntitledWrapper() {
	const [canvasWidth, setCanvasWidth] = useState(340);
	const [canvasHeight, setCanvasHeight] = useState(440);
	const [minWidth, setMinWidth] = useState(MIN_RHOMBUS_WIDTH);
	const [canvasBackground, setCanvasBackground] = useState('#e6e1da');
	const [minHeight, setMinHeight] = useState(MIN_RHOMBUS_HEIGHT);

	const handleCanvasBackgroundChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setCanvasBackground(e.currentTarget.value);
	};

	const handleCanvasWidthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setCanvasWidth(parseInt(e.currentTarget.value, 10));
	};

	const handleCanvasHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setCanvasHeight(parseInt(e.currentTarget.value, 10));
	};

	const handleMinWidthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const width = parseInt(e.currentTarget.value, 10);

		if (width >= 5) {
			setMinWidth(width);
		}
	};

	const handleMinHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const height = parseInt(e.currentTarget.value, 10);

		if (height >= 5) {
			setMinHeight(height);
		}
	};

	return (
		<div className={classes.root}>
			<Frame color={'#333'} frameWidth={12}>
				<Untitled
					canvasBackground={canvasBackground}
					canvasHeight={canvasHeight}
					canvasWidth={canvasWidth}
					minHeight={minHeight}
					minWidth={minWidth}
				/>
			</Frame>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor={'canvasBackground'}>Canvas Background</label>
					<input
						className={classes.colorPicker}
						type="color"
						id={'canvasBackground'}
						value={canvasBackground}
						onChange={handleCanvasBackgroundChange}
					/>
					<span>{canvasBackground}</span>
				</div>
				<div className={classes.control}>
					<label htmlFor={'canvasWidth'}>Canvas Width</label>
					<input
						placeholder={'width'}
						value={canvasWidth}
						id={'canvasWidth'}
						type="number"
						onChange={handleCanvasWidthChange}
					/>
					<label htmlFor={'canvasHeight'}>Canvas Height</label>
					<input
						id={'canvasHeight'}
						placeholder={'height'}
						value={canvasHeight}
						type="number"
						onChange={handleCanvasHeightChange}
					/>
				</div>

				<div className={classes.control}>
					<label htmlFor={'width'}>Rhombus Width</label>
					<input
						id={'width'}
						value={minWidth}
						type="number"
						onChange={handleMinWidthChange}
					/>
					<label htmlFor={'height'}>Rhombus Height</label>
					<input
						id={'height'}
						value={minHeight}
						type="number"
						onChange={handleMinHeightChange}
					/>
				</div>
			</div>
		</div>
	);
});
