import { registerAs } from '@nestjs/config';

const config = registerAs('config', () => ({
  mongo: {
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    dbName: process.env.MONGO_DB_NAME,
    port: parseInt(process.env.MONGO_PORT),
    host: process.env.MONGO_HOST,
    connection: process.env.MONGO_CONNECTION,
  },
}));

export default config;
