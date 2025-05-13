const exporter = (req, res, next) => {
    const data = JSON.stringify(req.body.notes);
    // const filePath = path.join(__dirname, "myfile.txt"); // rel path
    const filePath = path.join(`${process.env.ABSOLUTE_PATH}/my-journal.json`); // abs path
    fs.writeFile(filePath, data, (err) => {
        if (err) return res.status(500).send("Error saving the file");
        console.log(`File saved successfully`);
        res.send("File saved successfully");
    });
};

// ================================================================================================

module.exports = exporter;
