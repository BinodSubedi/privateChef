import dotenv from "dotenv";

const filePath = process.env.NODE_ENV == "production" ? ".env" : "dev.env";

dotenv.config({
  path: __dirname + "./../" + filePath,
});

const env = {
  port: process.env.PORT,
  db_port: +process.env.DB_PORT!,
  host: process.env.DB_HOST,
  db: process.env.DATABASE,
  user: process.env.DB_USER,
  pg_password: process.env.DB_PASSWORD,
};

export default env;
