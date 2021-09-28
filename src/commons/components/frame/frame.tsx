import { style, classes, vars } from './frame.st.css';

interface FrameProps {
    className?: string;
    spacing?: boolean;
    spacingWidth?: number;
    frameWidth?: number;
    color?: string;
    resizeWidth: (width: number) => void;
    resizeHeight: (height: number) => void;
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
        <div className={classes.root}>
            <div className={classes.widthResizer} />
            <div className={classes.heightResizer} />
            <div
                style={{
                    [vars.spacingWidth]: `${spacingWidth}px`,
                    [vars.frameWidth]: `${frameWidth}px`,
                    [vars.color]: color,
                }}
                className={style(classes.frame, { spacing }, className)}
            >
                {children}
            </div>
        </div>
    );
};
