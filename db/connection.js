import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
dotenv.config();

const connectPromise = {
    connectionString: process.env.database_url,
    ssl: {rejectUnauthorized: false}
};

const db = pgPromise()(connectPromise);

db.connect();

export default db;