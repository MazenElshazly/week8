import { MongoClient } from "mongodb";
import { DB_NAME, DB_URI } from "../../config/config.service.js";
const client = new MongoClient(DB_URI)

export const db = client.db(DB_NAME)
export const authenticateDB = async () => {
    try {
        await client.connect()
        console.log('DB connected');

    } catch (error) {
        console.log({ message: error });

    }
}