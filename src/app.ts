import 'reflect-metadata';
import './database';
import "express-async-errors";
import express, { Request, Response, NextFunction} from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          error: err.message,
        });
      }
      return response.status(500).json({
        error: `Internal server error - ${err}`,
      });
    }
  );

export default app;