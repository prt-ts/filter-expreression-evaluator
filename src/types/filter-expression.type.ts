type FilterValueType =
    | string
    | number
    | Date
    | string[]
    | number[]
    | Date[];

type FilterOperationType =
    // string types comparision
    | "greater_than"
    | "less_than"
    | "equal"
    | "starts_with"
    | "contains"

    // multiselelct comparision
    | "includes"

    // date type comparision
    | "date_equal"
    | "date_greater_than"
    | "date_less_than"

    // number comparision
    | "number_equal"
    | "number_greater_than"
    | "number_less_than";

type BasicExpression = {
    key: string;
    operation: FilterOperationType;
    value: FilterValueType;
};

type LogicalExpression = {
    condition: "and" | "or";
    expressions: Expression[];
};

type Expression = BasicExpression | LogicalExpression;

export {
    FilterValueType,
    FilterOperationType,
    BasicExpression,
    LogicalExpression,
    Expression
}