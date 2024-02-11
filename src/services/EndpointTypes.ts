import { IEndpoint } from "./Endpoint";

export type EPURL<T extends IEndpoint<any, any, any, any, any>> = T extends { url: infer U } ? U : never;
export type EPARGS<T extends IEndpoint<any, any, any, any, any>> = T extends { args: infer A } ? A : never;
export type EPMETHOD<T extends IEndpoint<any, any, any, any, any>> = T extends { method: infer M } ? M : never;
export type EPREQ<T extends IEndpoint<any, any, any, any, any>> = T extends { req: infer R } ? R : never;
export type EPRESP<T extends IEndpoint<any, any, any, any, any>> = T extends { resp: infer R } ? R : never;