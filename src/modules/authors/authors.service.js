
import { createAuthorCollection } from "../../DB/model/author.model.js"

export const createAuthorsCollection = async (input) => {
    const { name, nationality } = input
    await createAuthorCollection(name, nationality)
}