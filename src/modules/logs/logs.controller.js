
import { Router } from "express"
import {
    createLogsCollection,
    addlogfunc
} from "./logs.service.js"

const router = Router()

router.post("/collection/logs/capped", async (req, res, next) => {


    const result = await createLogsCollection()
    return res.status(201).json({ message: "logs collection created successfully", result })
})

router.post("/logs", async (req, res, next) => {
    const { book_id, action } = req.body
    const result = await addlogfunc(book_id, action)
    return res.status(201).json({ message: "log created successfully", result })
})

export default router