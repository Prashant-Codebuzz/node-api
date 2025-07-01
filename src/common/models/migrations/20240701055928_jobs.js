/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('jobs',(table)=>{
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('categoryId').unsigned();
    table.foreign('categoryId').references('category.id');
    table.string('companyName').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobs')
};
