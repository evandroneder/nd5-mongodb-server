import { Request, Response, Router } from "express";

export const GetRouter = () => Router();

export interface IRequest extends Request {
  data: any;
}

export interface IResponse extends Response {
  ok: (data?: any) => void;
  error: (e: any) => void;
  unauthorized: (e: any) => void;
}
