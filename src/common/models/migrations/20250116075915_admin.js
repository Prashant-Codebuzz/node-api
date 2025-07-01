/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('admin', (table) => {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.text('token').nullable()
    }).then(() => {
      // Insert the initial admin record
      return knex('admin').insert({
        email: "jobfinder@admin.com", 
        password: "jobfinder" 
      });
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('admin');
  };