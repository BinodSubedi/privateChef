import dotenv from "dotenv";

const filePath = process.env.NODE_ENV == "production" ? ".env" : "dev.env";

dotenv.config({
  path: __dirname + "./../" + filePath,
});

const env = {
  port: process.env.PORT,
};

export default env;
