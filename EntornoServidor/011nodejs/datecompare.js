function dateCompare(date1, date2 = new Date()) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (d1 < d2) {
        return { startDate: d1.toISOString(), endDate: d2.toISOString() };
    } else {
        return { startDate: d2.toISOString(), endDate: d1.toISOString() };
    }
}

module.exports = dateCompare;