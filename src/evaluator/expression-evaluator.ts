import { compareDates, compareNumbers, compareStrings, compareValueIncludes } from "../helpers";
import { BasicExpression, FilterValueType, LogicalExpression } from "../types/filter-expression.type";

function evaluateLogicalExpression(
    expr: LogicalExpression,
    obj: Object
): boolean {
    const { condition, expressions } = expr;
    const fn = condition === "and" ? expressions.every : expressions.some;
    return fn.call(expressions, (expr: any) => {
        const isQuery = "condition" in expr;
        if (isQuery) {
            return evaluateLogicalExpression(expr, obj);
        } else {
            return evaluateExpression(expr, obj);
        }
    });
}

function evaluateExpression(
    expression: BasicExpression,
    obj: any
): boolean {
    const { key, operation, value } = expression;
    const propValue = (obj[key] as FilterValueType);
    switch (operation) {
        case "greater_than":
        case "less_than":
        case "starts_with":
        case "contains":
            return compareStrings(propValue as string, value as string, operation)

        case "includes":
            return compareValueIncludes(value as any[], propValue as any[], operation)

        case "date_equal":
        case "date_greater_than":
        case "date_less_than":
            return compareDates(propValue, value, operation);

        case "number_equal":
        case "number_greater_than":
        case "number_less_than":
            return compareNumbers(propValue as number, value as number, operation);

        case "equal":
        default:
            return (
                `${propValue}`?.toLocaleLowerCase() == `${value}`?.toLocaleLowerCase()
            );
    }
}

function applyFilterExpression<T>(
    items: T[],
    globalSearchTerm: string,
    logicalExpression: LogicalExpression
) {
    // copy items
    let filteredItems: any[] = [...items];

    // verify if global filter exists -- if such, apply filter
    if (globalSearchTerm?.length) {
        filteredItems = filteredItems?.filter(function (item: any) {
            return Object.keys(item).some(function (k) {
                return (
                    (item as any)?.[k]
                        ?.toString()
                        ?.toLowerCase()
                        ?.indexOf(`${globalSearchTerm}`?.toLocaleLowerCase()) > -1
                );
            });
        });
    }

    // check column level expression, if such, evaluate and apply column level filter
    if (logicalExpression.expressions) {
        filteredItems = filteredItems?.filter((item: any) =>
            evaluateLogicalExpression(logicalExpression, item)
        );
    }
    return filteredItems;
}

export { applyFilterExpression }