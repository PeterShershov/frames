import { ChangeEventHandler, memo, useCallback, useMemo, useState } from 'react';
import { Frame } from '../commons/components/frame/frame';
import { RNG } from '../commons/utils/random';
import { MIN_RHOMBUS_HEIGHT, MIN_RHOMBUS_WIDTH } from './constants';
import { Untitled } from './untitled';
import { classes } from './untitled-wrapper.st.css';

export const UntitledWrapper = memo(function UntitledWrapper() {
    const storedSeedNumber = localStorage.getItem('untitledSeedNumber');
    const storedCanvasWidth = localStorage.getItem('untitledCanvasWidth');
    const storedCanvasHeight = localStorage.getItem('untitledCanvasHeight');
    const storedMinWidth = localStorage.getItem('untitledMinWidth');
    const storedMinHeight = localStorage.getItem('untitledMinHeight');

    const [canvasWidth, setCanvasWidth] = useState(
        storedCanvasWidth ? parseInt(storedCanvasWidth) : 340
    );
    const [canvasHeight, setCanvasHeight] = useState(
        storedCanvasHeight ? parseInt(storedCanvasHeight) : 440
    );
    const [minWidth, setMinWidth] = useState(
        storedMinWidth ? parseInt(storedMinWidth) : MIN_RHOMBUS_WIDTH
    );
    const [canvasBackground, setCanvasBackground] = useState('#e6e1da');
    const [minHeight, setMinHeight] = useState(
        storedMinHeight ? parseInt(storedMinHeight) : MIN_RHOMBUS_HEIGHT
    );
    const [seedNumber, setSeedNumber] = useState(
        storedSeedNumber ? parseFloat(storedSeedNumber) : 1
    );

    const seed = useMemo(() => RNG(seedNumber), [seedNumber]);
    const handleCanvasBackgroundChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setCanvasBackground(e.currentTarget.value);
    };

    const handleCanvasWidthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        localStorage.setItem('untitledCanvasWidth', e.currentTarget.value);
        setCanvasWidth(parseInt(e.currentTarget.value, 10));
    };

    const handleCanvasHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        localStorage.setItem('untitledCanvasHeight', e.currentTarget.value);
        setCanvasHeight(parseInt(e.currentTarget.value, 10));
    };

    const handleMinWidthChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const width = parseInt(e.currentTarget.value, 10);

        if (width > 1) {
            localStorage.setItem('untitledMinWidth', e.currentTarget.value);
            setMinWidth(width);
        }
    };

    const handleMinHeightChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const height = parseInt(e.currentTarget.value, 10);

        if (height > 1) {
            localStorage.setItem('untitledMinHeight', e.currentTarget.value);
            setMinHeight(height);
        }
    };

    const regenerate = () => {
        const number = Math.random();
        localStorage.setItem('untitledSeedNumber', number.toString());
        setSeedNumber(number);
    };

    return (
        <div className={classes.root}>
            <Frame color={'#333'} spacingWidth={44} spacing frameWidth={12}>
                <Untitled
                    seed={seed}
                    canvasBackground={canvasBackground}
                    canvasHeight={canvasHeight}
                    canvasWidth={canvasWidth}
                    minHeight={minHeight}
                    minWidth={minWidth}
                />
            </Frame>
            <div className={classes.controls}>
                <div className={classes.control}>
                    <button onClick={regenerate}>Regenerate</button>
                </div>
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
