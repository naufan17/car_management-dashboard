import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('options', (table: Knex.TableBuilder) => {
        table.increments('option_id').primary();
        table.uuid('car_id').references('car_id').inTable('cars');
        table.string('option', 50).notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('options')
}