const EntriesMiniature = ({ title, id, name }) => {
    return (
        <div className="all-entries__miniature" title={title} data-id={id}>
            {name}
        </div>
    );
};

export default EntriesMiniature;
