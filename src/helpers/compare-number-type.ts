/**
 * 
 * @param num1 
 * @param num2 
 * @param compareType 
 * @returns boolean value either specified compare types matche or not for number data type
 */
function compareNumbers(
    num1: number,
    num2: number,
    compareType: "number_equal" | "number_greater_than" | "number_less_than"
) {
    try {
        switch (compareType) {
            case "number_equal":
                return +num1 == +num2;

            case "number_greater_than":
                return +num1 > +num2;

            case "number_less_than":
                return num1 < num2;
        }
    } catch {
        return false;
    }
}

export {
    compareNumbers
}