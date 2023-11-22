import logger from './utils/logger.js';
import express, { Application, Response, Request } from 'express';
import winstonMiddleware from 'express-winston';
import {
  allowedContentType,
  allowedHttpMethods,
} from './middlewares/app.middleware.js';
import nocache from 'nocache';

import userRouter from './routers/user.router.js';

const app: Application = express();

app.use(allowedHttpMethods);
app.use(allowedContentType);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(nocache);

app.use(
  winstonMiddleware.logger({
    winstonInstance: logger,
    level: (req: Request, res: Response) => {
      let level = 'info';
      if (res.statusCode >= 500) {
        level = 'error';
      } else if (res.statusCode >= 300) {
        level = 'warn';
      }
      return level;
    },
  })
);

app.use('/user', userRouter);

export default app;
