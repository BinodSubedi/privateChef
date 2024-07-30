import { Knex } from "knex";

const TABLE_NAME = "File";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary();
    table.bigint("user_id").unsigned();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    table.timestamp("updated_at").nullable();

    table.string("file_name", 35).notNullable();
    table.string("file_type", 30).notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("User")
      .onDelete("CASCADE");
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
