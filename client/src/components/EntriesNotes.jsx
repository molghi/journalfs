import "./styles/EntriesNotes.scss";
import EntriesNote from "./EntriesNote";

const EntriesNotes = () => {
    const noteBody = `Jurassic Park
<br />
<br />
Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fugiat a quam repellendus minus iure incidunt quis delectus veritatis sint ea earum ratione, veniam iusto, saepe accusamus similique, libero deserunt?`;

    return (
        <div className="all-entries__notes">
            <EntriesNote
                id="1737988579267"
                title="Recent thoughts"
                note={noteBody}
                keywords="mishmash, whatever"
                date="27/1/25"
            />
        </div>
    );
};

export default EntriesNotes;
