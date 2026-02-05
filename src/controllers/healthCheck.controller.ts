import { Request, Response } from "express";

export const healthCheck = (_req: Request, res: Response) => {
    return res.status(200).json({
        health: "ok",
    });
};
