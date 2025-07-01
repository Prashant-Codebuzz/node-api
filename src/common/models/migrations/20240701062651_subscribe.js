/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('subscribe',(table)=>{
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('subscribe')
  };
  