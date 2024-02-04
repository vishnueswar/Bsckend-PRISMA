import dotenv from "dotenv";

dotenv.config();

const {
    DATABASE_URL,
    SECRET_KEY,
    PORT,
} = process.env;


export {
    DATABASE_URL,
    SECRET_KEY,
    PORT,
}