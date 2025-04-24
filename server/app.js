import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
