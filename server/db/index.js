import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { userSchema } from "../models/user.models.js";

dotenv.config({});

const sequelize = new Sequelize(
    process.env.DB_NAME || "database",
    process.env.DB_USERNAME || "user",
    process.env.DB_PASSWORD || "password",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "postgres",
        logging: false,
    }
);

let User = null;

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully!");
        User = await userSchema(sequelize);
        await sequelize.sync({ force: false });
        console.log("✅ Database synced successfully!");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
        process.exit(1);
    }
};

export { User };
