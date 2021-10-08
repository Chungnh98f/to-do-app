const capitalizing = (str: string): string => {
    if (!str) {
        return str;
    }
    return str
        .split("-")
        .map((element) =>
            element[0].toUpperCase().concat(element.slice(1).toLowerCase())
        )
        .join(" ");
};

const capitalizingSentence = (str: string): string => {
    if (!str) {
        return str;
    }
    return str
        .split(" ")
        .map((element) =>
            element[0].toUpperCase().concat(element.slice(1).toLowerCase())
        )
        .join(" ");
};

const lowercase = (str: string): string => {
    return str
        .split(" ")
        .map((element) => element.toLowerCase())
        .join("-");
};

const toDate = (num: number | undefined): string | null => {
    if (!num) {
        return null;
    }
    const date = new Date(num * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day >= 10 ? day : `0${day}`}/${
        month >= 10 ? month : `0${month}`
    }/${year}`;
};

const toDateString = (num: number | undefined): string => {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    if (!num) {
        return "";
    }
    const date = new Date(num * 1000);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();

    return `${day >= 10 ? day : `0${day}`} ${month}, ${year}`;
};

const getFilterRow = (rows: any[], input: string): any[] => {
    return rows.filter((row: any) => {
        return Object.values(row).some((s) => {
            if (typeof s === "object") {
                return JSON.stringify(s)
                    .toLowerCase()
                    .includes(input.toLowerCase());
            }
            return (s + "").toLowerCase().includes(input.toLowerCase());
        });
    });
};

export {
    getFilterRow,
    capitalizing,
    lowercase,
    capitalizingSentence,
    toDate,
    toDateString,
};
