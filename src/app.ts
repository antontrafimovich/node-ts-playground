import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import path from "path";

import { ExcelDataBase } from "./db";
import { useBaseRoutes, usePaymentsRoutes } from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

useBaseRoutes(app);
usePaymentsRoutes(app, new ExcelDataBase());

export { app };
