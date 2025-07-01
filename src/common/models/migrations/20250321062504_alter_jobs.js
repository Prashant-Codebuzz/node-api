// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.up = function(knex) {
//   return knex.schema.alterTable('jobs',(table)=>{
//     table.text('url').nullable();
//   })
// };

// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.down = function(knex) {
//     return knex.schema.alterTable('jobs',(table)=>{
//         table.dropColumn('url');
//       })
// };



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable('jobs', (table) => {
    table.text('url').nullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ 
export async function down(knex) {
  return knex.schema.alterTable('jobs', (table) => {
    table.dropColumn('url');
  });
}
