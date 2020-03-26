import { Request, Response } from "express";
export declare const GetRouter: () => import("express-serve-static-core").Router;
export interface IRequest extends Request {
    data: any;
}
export interface IResponse extends Response {
    ok: (data?: any) => void;
    error: (e: any) => void;
    unauthorized: (e: any) => void;
}
