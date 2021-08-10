import { Todo } from "./entities/Todo";
import { User } from "./entities/User";
import cors from "cors";
import express from "express";
import { createConnection } from "typeorm";
import path from "path";
import { router } from "./api";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: "todos",
        username: "postgres",
        password: "postgres",
        logging: true,
        synchronize: false,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User, Todo],
    });

    // await conn.runMigrations();

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    app.use(bodyParser.json());

    app.use(
        cors({
            origin: "http://localhost:4200",
            credentials: true,
        })
    );

    app.use(router);

    app.listen(process.env.PORT || 5050, () => {
        console.log("Server started on localhost:5050");
        console.log(process.env.PORT || 4000);
    });
};

main().catch((err) => console.log(err));
