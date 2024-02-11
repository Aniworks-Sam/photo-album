import * as t from "io-ts";
import { decode } from "./Decode";
import { HttpMethod, IArgs, IEndpoint, MethodWithoutBody } from "./Endpoint";
import { EPARGS, EPMETHOD, EPREQ, EPRESP, EPURL } from "./EndpointTypes";

const getUriArgs = <A extends IArgs>(args: A) => (args && Object.keys(args as {}).length ? "?" + new URLSearchParams(args) : "");
export interface IContextHeaders {
    [key: string]: string;
}
export type Consumer<T extends IEndpoint<any, any, any, any, any>> = (
    url: EPURL<T>,
    method: EPMETHOD<T>
) => (args: EPARGS<T>, req: EPREQ<T>, headers?: HeadersInit) => Promise<EPRESP<T>>;

export const fetchJson = (baseUrl: string, url: string, method: HttpMethod, args: IArgs, req: object | FormData, headers?: HeadersInit) =>
    fetch(baseUrl + url + getUriArgs(args), {
        body: req ? JSON.stringify(req) : null,
        //credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            ...headers,
        },
        method,
        mode: "cors",
    }).then((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
            if (response.status !== 204) {
                return readBody(response) as unknown;
            } else {
                return;
            }
        }
        throw response;
    }) as Promise<unknown>;

export const treditionalFetchJson = (baseUrl: string, url: string, method: HttpMethod, args: IArgs, req: File, headers?: HeadersInit) =>
    fetch(baseUrl + url + getUriArgs(args), {
        body: req ? req : undefined,
        //credentials: "include",
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            Accept: "application/json",
            ...headers,
        },
        method,
        mode: "cors",
    }).then((response: Response) => {
        if (response.status >= 200 && response.status < 300) {
            if (response.status !== 204) {
                return response;
                // return readBody(response) as unknown;
            } else {
                return;
            }
        }
        throw response;
    }) as Promise<unknown>;

export const readBody = (() => {
    const cache = new WeakMap<Response, Promise<unknown>>();
    return (r: Response): Promise<unknown> => {
        if (!cache.has(r)) {
            cache.set(
                r,
                r.text().then((text) => {
                    try {
                        return JSON.parse(text || "null");
                    } catch {
                        return text;
                    }
                }),
            );
        }
        return cache.get(r)!;
    };
})();

export const consumer = <T extends IEndpoint<any, any, any, any, any>>(baseUrl: string): Consumer<T> => (url, method) => (args, req, headers = {}) =>
    fetchJson(baseUrl, url, method, args, req, headers) as Promise<EPRESP<T>>;

export const consumerTreditional = <T extends IEndpoint<any, any, any, any, any>>(baseUrl: string): Consumer<T> => (url, method) => (args, req, headers = {}) =>
    treditionalFetchJson(baseUrl, url, method, args, req, headers) as Promise<EPRESP<T>>;

export type EndpointResponseDefiniton<T extends IEndpoint<any, any, any, any, any>> = t.Type<EPRESP<T>>;

export const strictConsumer = <T extends IEndpoint<any, any, any, any, any>, TParsed extends EndpointResponseDefiniton<T> = EndpointResponseDefiniton<T>>(
    baseUrl: string,
    definition: TParsed,
    logger: (...errors: string[]) => void,
): Consumer<IEndpoint<EPURL<T>, EPARGS<T>, EPMETHOD<T>, EPMETHOD<T> extends MethodWithoutBody ? void : EPREQ<T>, t.TypeOf<TParsed>>> => {
    const cons = consumer(baseUrl);
    const parser = decode(logger)(definition.decode);
    return (url, method) => {
        const ep = cons(url, method);
        return (args, req, headers) => ep(args, req, headers).then(parser);
    };
};

export const consumerAsync = async (payload: any, url: string) => {
    const response = await fetch(url, {
        method: HttpMethod.POST,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept"
        },
        redirect: 'follow',
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload)
    });
    return await response;
};