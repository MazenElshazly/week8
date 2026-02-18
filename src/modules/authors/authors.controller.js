
import { Router } from "express"
import { createAuthorsCollection } from "./authors.service.js"

const router = Router()

router.post("/collection/authors", async (req, res, next) => {
    const result = await createAuthorsCollection(req.body)
    return res.status(201).json({ message: "authors collection created successfully", result })
})

export default router   