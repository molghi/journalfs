import "./styles/EntriesBrowser.scss";
import EntriesMiniature from "./EntriesMiniature";

const EntriesBrowser = () => {
    return (
        <>
            <div className="all-entries__browser">
                <EntriesMiniature
                    title={`Title: Recent thoughts
Note: Jurassic Park Lorem ipsum dolor sit amet consectetur adipisicing elit...`}
                    id="1737988579267"
                    name="Recent thoughts"
                />
            </div>
        </>
    );
};

export default EntriesBrowser;
