function compareStrings(
    str1: string,
    str2: string,
    operation: "greater_than" | "less_than" | "contains" | "starts_with"
): boolean {

    const first = (str1)?.toLocaleLowerCase();
    const second = (str2)?.toLocaleLowerCase();
    switch (operation) {
        case "greater_than":
            return first > second;
        case "less_than":
            return (
                first < second
            );
        case "contains":
            return new RegExp(second + "").test(
                first + ""
            );
        case "starts_with":
            return new RegExp("^" + second + "").test(
                first + ""
            );
    }

    return false;
} 

export { compareStrings };