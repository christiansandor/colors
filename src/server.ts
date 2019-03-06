import * as dotenv from 'dotenv';

dotenv.config();

import { createServer } from 'http';
import { app } from './app';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '3000';

export const server = createServer(app);

console.log(`[Server] Initiating server`);
server.listen(parseInt(port, 10), host, function () {
    console.log(`[Server] Listening on http://${host}:${port}`);
});
