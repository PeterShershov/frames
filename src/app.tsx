import { st, classes } from './app.st.css';
import { BoxesWrapper } from './boxes/boxes-wrapper';
import { UntitledWrapper } from './lori-ellison-untitled-2012/untitied-wrapper';

export interface AppProps {
    className?: string;
}

export const App: React.VFC<AppProps> = ({ className }) => {
    return (
        <main className={st(classes.root, className)}>
            {/* <UntitledWrapper /> */}
            <BoxesWrapper />
        </main>
    );
};
