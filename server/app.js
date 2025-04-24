import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
});

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
