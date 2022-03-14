import "reflect-metadata";
import "express-async-errors";
import createConnection from "./database";
import express, { Application, Request, Response, NextFunction } from "express";
import routes from "./routes";

class App {
  public express: Application;

  public constructor() {
    this.express = express();

    this.database();

    this.middlewares();

    this.routes();
  }

  private database(): void {
    createConnection();
  }

  private middlewares(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use(routes);
    this.express.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
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
  }
}

export default new App().express;
