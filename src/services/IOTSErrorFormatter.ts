import { Either, isRight } from "fp-ts/lib/Either";
import * as t from "io-ts";

export const formatError = (validation: Either<t.Errors, any>): string => {
    if (isRight(validation)) {
        return "";
    }
    const { left: errors } = validation;
    return errors.map(formatSingleError).join("\n\n");
};
const formatSingleError = (err: t.Errors[number]) =>
    `Invalid value ${typeof err.value === "string" ? `"${err.value}"` : err.value} of type ${typeof err.value} provided in ${err.context
        .map((c) => c.key)
        .filter((s) => s.length)
        .join("/")}.\nExpected a value of type ${err.context[err.context.length - 1].type.name}.`;