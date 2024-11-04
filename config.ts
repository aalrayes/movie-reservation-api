import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    dbname: process.env.DB_NAME,
}

export default config;
