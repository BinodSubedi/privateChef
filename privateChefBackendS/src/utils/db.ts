import knex, { Knex } from "knex";
import env from "../config";

export const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    port: env.db_port,
    host: env.host,
    database: env.db,
    user: env.user,
    password: env.pg_password,
  },
};

export default knex(knexConfig);
