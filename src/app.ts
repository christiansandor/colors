import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { router } from './router';
import { resolve } from 'path';

export const app = express();


app.enable('trust proxy'); // Use only if you're behind a reverse proxy as Nginx or Heroku

app.use(morgan('tiny'));
app.use(helmet());

app.use(express.static(resolve(__dirname, '..', 'public')));

// Limiting each IP to 100 requests per hour
app.use(rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
}));

app.use(router);
