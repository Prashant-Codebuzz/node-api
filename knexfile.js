import dotenv from 'dotenv';
dotenv.config();

const client = process.env.CLIENT;

export default {
  development: {
    client: client,
    connection: {
      filename: process.env.DATABASE, // Change this to the path where you want to store the SQLite database
    },
    useNullAsDefault: true, // Required for SQLite
    migrations: {
      directory: './src/common/models/migrations', // Path where migrations will be saved
    },
  },
};
