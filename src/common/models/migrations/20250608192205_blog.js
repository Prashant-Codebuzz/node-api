// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function (knex) {
//     return knex.schema.createTable('blog', (table) => {
//         table.increments('id').primary();
//         table.string('name').notNullable();
//         table.timestamp('createdAt').defaultTo(knex.fn.now());
//         table.timestamp('updatedAt').nullable();

//         table.increments('id').primary();
//         table.string('title').notNullable();
//         table.string('image');
//         table.text('description');
//         table.string('authorname');
//         table.timestamp('createdAt').defaultTo(knex.fn.now());
//         table.timestamp('updatedAt').nullable();
//     })
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function (knex) {
//     return knex.schema.dropTable('blog')
// };




export async function up(knex) {
    return knex.schema.createTable('blog', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('image');
        table.text('description');
        table.string('authorname');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
    });
}

export async function down(knex) {
    return knex.schema.dropTable('blog');
}
