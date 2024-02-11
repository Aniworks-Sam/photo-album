import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import { formatError } from "./IOTSErrorFormatter";

export type Decode<T extends t.Any> = (decodeMethod: (arg: t.TypeOf<T>) => t.Validation<T>) => (arg: t.TypeOf<T>) => t.TypeOf<T>;

export const decode = <T extends t.Any>(logError: (...s: string[]) => void): Decode<T> => (decodeMethod) => (arg) => {
    const result = decodeMethod(arg);
    if (isLeft(result)) {
        logError("Data Validation Error:\n", formatError(result));
        throw new Error("Invalid service response");
    } else {
        return result.right;
    }
};