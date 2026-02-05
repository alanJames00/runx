import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import apiRouter from "./api/routes";

// setup dotenv to inject ENV
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// mount middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// mount routers
app.use("/api", apiRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
