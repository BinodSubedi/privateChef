import { Knex } from "knex";
import env from "./config";

export const knexBaseConfig: Knex.Config = {
  client: "pg",
  connection: {
    port: env.db_port,
    host: env.host,
    database: env.db,
    user: env.user,
    password: env.pg_password,
  },
};

const knexConfig: Knex.Config = {
  ...knexBaseConfig,
  migrations: {
    directory: "database/migrations",
    tableName: "knex_migrations",
    extension: "ts",
    stub: "./stubs/migration.stub",
  },
  seeds: {
    directory: "./seed",
    extension: "ts",
  },
};

export default knexConfig;
