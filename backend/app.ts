require('dotenv').config();
import express, { Express } from 'express';
import cors from 'cors';
import { Client } from 'pg';
import router from './src/routes';
import rateLimit from './src/utils/rateLimit';
import { configureTrustProxy } from './src/utils/configureTrustProxy';
import { getClientIp } from './src/middlewares/getClientIp';
import errorHandler from './src/middlewares/errorHandler';
import { NotFoundError } from './src/errors/errors';

const {
    HTTP_PORT = 8081,
    PGHOST = 'localhost',
    PGPORT = '5432',
    PGUSER = 'admin',
    PGPASSWORD = 'password123',
    PGDATABASE = 'short-link',
} = process.env;

const app: Express = express();
app.use(rateLimit);
app.use(cors());
app.use(express.json());

// trust proxy
configureTrustProxy(app);
// custom middleware to get client IP
app.use(getClientIp);
app.use(router);

app.use((req, res, next) => {
    throw new NotFoundError();
});
app.use(errorHandler);

// PostgreSQL connection via 'pg' package
async function connect() {
    const client = new Client({
        host: PGHOST,
        port: PGPORT ? Number(PGPORT) : 5432,
        user: PGUSER,
        password: PGPASSWORD,
        database: PGDATABASE,
    });

    try {
        await client.connect();
        console.log('Connected to PostgreSQL successfully!');
        app.listen(HTTP_PORT, () => {
            console.log(`connected! on port ${HTTP_PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        process.exit(1);
    }
}

connect();
