import { Request, Response } from "express";
import { runtimes } from "../api/runtimes";

export const listRuntimes = (_req: Request, res: Response) => {
    return res.status(200).json(runtimes);
}
