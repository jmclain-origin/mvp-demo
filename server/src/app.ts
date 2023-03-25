import path from 'path';
import express from 'express';
import cors from 'cors';
import environmentVars from '@global/environmentVars';

import { connectDB } from './services/db.config';
import v1Routes from './api/v1/routes';

const { NODE_ENV }: typeof environmentVars = environmentVars;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'static')));

console.log(path.join(__dirname, 'static'));

if (NODE_ENV !== 'test') {
    connectDB();
} else {
    app.get('/test', (_req, res) => {
        res.status(200).json({
            message: 'This is a test message',
        });
    });
}

app.use('/api/v1', v1Routes);

if (NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
    app.get('*', (_request, response) => {
        response.sendFile(__dirname + '/index.html');
    });
}

export default app;
