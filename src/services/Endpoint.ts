export enum HttpMethod {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    DELETE = "DELETE",
}
export type MethodWithoutBody = HttpMethod.GET | HttpMethod.DELETE; //No body is required

export type IArgs = Record<string, string> | undefined | string;

export interface IEndpoint<
    URL extends string,
    ARGS extends IArgs,
    METHOD extends HttpMethod,
    REQ extends METHOD extends MethodWithoutBody ? void : object,
    RESP> {
    url: URL;
    args: ARGS;
    method: METHOD;
    req: REQ;
    resp: RESP;
};
export type IEndpointType<
    URL extends string,
    ARGS extends IArgs,
    METHOD extends HttpMethod,
    REQ extends METHOD extends MethodWithoutBody ? void : object,
    RESP> = {
        [key in never]: URL | ARGS | METHOD | REQ | RESP;
    };