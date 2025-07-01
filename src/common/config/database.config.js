import knex from 'knex';
import knexFile from '../../../knexfile.js';
import { attachPaginate } from "knex-paginate";
const environment = process.env.NODE_ENV || "development";

attachPaginate();
const db = knex(knexFile[environment]);
console.log(`Database connected in ${environment} mode.`);
export default db;