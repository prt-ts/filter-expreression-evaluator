/**
 * 
 * @param date1 
 * @param date2 
 * @param compareType 
 * @returns boolean value either specified compare types matche or not for Date Type
 */
function compareDates(
    date1: any,
    date2: any,
    compareType: "date_equal" | "date_greater_than" | "date_less_than"
) {
    try {
        const d1 = new Date(date1);
        d1.setHours(0, 0, 0);

        const d2 = new Date(date2);
        d2.setHours(0, 0, 0);

        switch (compareType) {
            case "date_equal":
                return d1 == d2;

            case "date_greater_than":
                return d1 > d2;

            case "date_less_than":
                return d1 < d2;
        }
    } catch {
        return false;
    }
}

export {
    compareDates
}