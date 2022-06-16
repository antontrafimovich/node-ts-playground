import express from "express";
import * as path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

export { app };
