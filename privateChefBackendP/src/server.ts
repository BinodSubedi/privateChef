import express from "express";
import env from "./config";
import router from "./route";
import { globalErrorHandler } from "./error/error";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(globalErrorHandler);

const port = env.port;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});
