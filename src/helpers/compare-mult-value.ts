function compareValueIncludes(
    value1: any[],
    value2: any[],
    operation: "includes"
): boolean {

    switch (operation) {

        case "includes":
            return (
                Array.isArray(value1) &&
                (value1.length == 0 || (value1 as any)?.indexOf(value2) > -1)
            );
    }

    return false;
}

export { compareValueIncludes }