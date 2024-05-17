import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
        table.uuid('id').primary();
        table.string('plate', 10).unique();
        table.string('manufacture', 50).notNullable();
        table.string('model', 50).notNullable();
        table.string('image', 255);
        table.integer('capacity', 10).notNullable();
        table.text('description');
        table.string('transmission', 20).notNullable();
        table.string('type', 20).notNullable();
        table.integer('year', 10).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());    
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cars')
}