/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('jobsearcher',(table)=>{
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('phone').notNullable();
        table.string('time').notNullable();
        table.string('gender').notNullable();
        table.string('resume').notNullable();
        table.text('coverLatter').notNullable();
        table.integer('jobId').unsigned();
        table.foreign('jobId').references('jobs.id');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').nullable();
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('jobsearcher')
};
