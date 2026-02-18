import { db } from "../connection.db.js"

export const createAuthorCollection = async (input, input2) => {
    return await db.collection("authors").insertOne({
        name: input,
        nationality: input2
    })
}