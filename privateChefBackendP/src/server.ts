import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "./config";
import router from "./route";
import { globalErrorHandler } from "./error/error";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);

app.use(globalErrorHandler);

const port = env.port;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});
