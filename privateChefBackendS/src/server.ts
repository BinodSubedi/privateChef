import express from "express";
import env from "./config";

const app = express();

app.use(express.json());

const port = env.port;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}....`);
});
