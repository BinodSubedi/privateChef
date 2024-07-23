import { knexBaseConfig } from "../knexfile";
import knex, { Knex } from "knex";

const knexConfig: Knex.Config = {
  ...knexBaseConfig,
  //adding other post-processing stuff here
};

export default knex(knexConfig);
