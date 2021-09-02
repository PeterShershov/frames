import { ChangeEventHandler, memo, useState } from 'react';
import { Frame } from '../commons/components/frame/frame';
import { Boxes } from './boxes';
import { classes } from './boxes-wrapper.st.css';

export const BoxesWrapper = memo(function BoxesWrapper() {
    const [canvasWidth, setCanvasWidth] = useState(340);
    const [canvasHeight, setCanvasHeight] = useState(440);
    const [canvasBackground, setCanvasBackground] = useState('#e6e1da');

    const handleCanvasBackgroundChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCanvasBackground(e.currentTarget.value);
    };

    const handleCanvasWidthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCanvasWidth(parseInt(e.currentTarget.value, 10));
    };

    const handleCanvasHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCanvasHeight(parseInt(e.currentTarget.value, 10));
    };

    return (
        <div className={classes.root}>
            <Frame color={'#2c2b2a'} frameWidth={12}>
                <Boxes
                    canvasBackground={canvasBackground}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
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
            </div>
        </div>
    );
});
