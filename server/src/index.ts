import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Todo } from "./entities/Todo";
import { User } from "./entities/User";
import { router } from "./routes";

dotenv.config();

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: process.env.POSTGRES_DATABASE || "todos",
        host: process.env.POSTGRES_HOST || "localhost",
        port: Number(process.env.POSTGRES_PORT) || 5432,
        username: process.env.POSTGRES_USER || "postgres",
        password: process.env.POSTGRES_PASSWORD || "postgres",
        logging: true,
        synchronize: false,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Todo],
    });

    try {
        await conn.runMigrations();
    } catch (err) {
        console.log(err);
    }

    const app = express();
    app.use(cors());
    app.use(helmet());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(bodyParser.json());

    app.use(router);

    app.listen(process.env.PORT || 5050, () => {
        console.log("Server started on localhost:5050");
        console.log(process.env.PORT || 4000);
    });
};

main().catch((err) => console.log(err));

process.on("SIGINT", () => process.exit());
