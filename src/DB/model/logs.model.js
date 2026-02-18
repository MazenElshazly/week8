import { db } from "../connection.db.js"

export const logCollection = async () => {
    db.createCollection("logs", {
        capped: true,
        size: 1024 * 1024
    })
}
export const addlog = async (id, action) => {
    return await db.collection("logs").insertOne({ id, action })
}