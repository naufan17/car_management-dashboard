import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('rents', (table: Knex.TableBuilder) => {
        table.increments('rent_id').primary();
        table.uuid('car_id').references('car_id').inTable('cars');
        table.integer('rent_price', 50).notNullable();
        table.boolean('available').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('rents')
}