import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller";
import { listRuntimes } from "../controllers/listRuntimes.controller";
import { executeProgram } from "../controllers/executeProgram.controller";

const apiRouter: Router = Router();

apiRouter.get("/health", healthCheck);

apiRouter.get("/runtimes", listRuntimes);

apiRouter.post("/execute", executeProgram);

export default apiRouter;
