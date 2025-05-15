// Format date

const formatDate = (dateString) => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
    });
    return formatter
        .format(dateString)
        .split("/")
        .map((unit, index) => {
            if (index < 2 && unit[0] === "0") return (unit = unit.slice(1)); // if it is '05/06/25', make it '5/6/25'
            return unit;
        })
        .join("/");
};

// output example: '5/6/25'

export default formatDate;
