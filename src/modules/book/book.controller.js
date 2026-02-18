
import { Router } from "express"
import {
    createBookCollection,
    addBook,
    createIndex,
    bookBatch,
    updateBookfunc,
    findBookFunc,
    getBooksByYearRangeFunc,
    getBookByGenreFunc,
    getBooksWithPaginationFunc,
    findYearByTypeFunc,
    getBooksWithoutFunc,
    deleteOldBooksFunc,
    getBooksSortedFunc,
    getBooksProjectedFunc,
    unwindGenresFunc,
    getBooksWithLogsFunc
} from "./book.service.js"


const router = Router()

router.post("/collection/books", async (req, res, next) => {
    const result = await createBookCollection()
    return res.status(201).json({ message: "Books collection created successfully", result })
})


router.post("/collection/books/index", async (req, res, next) => {
    const result = await createIndex()
    return res.status(201).json({ message: "title index created successfully", result })
})



router.post("/books", async (req, res, next) => {
    const { title, author, year, genres = [] } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "title and author are required", genres
        });
    }
    const result = await addBook({ title, author, year, genres })
    return res.status(201).json({ message: "book added successfully", result })
})

router.post("/books/batch", async (req, res, next) => {
    const result = await bookBatch(req.body)
    return res.status(201).json({
        message: "Books inserted successfully", result
    })
})
router.patch("/books/:name", async (req, res, next) => {
    const result = await updateBookfunc(req.params.name, req.body.year)
    return res.status(200).json({
        message: "Book Updated successfully",

    })
})

router.get("/books/title", async (req, res, next) => {


    const result = await findBookFunc(req.query.title)
    return res.status(200).json({
        message: "success", result

    })
})

router.get("/books/year", async (req, res, next) => {
    const result = await getBooksByYearRangeFunc(req.query.from, req.query.to)
    return res.status(200).json({
        message: "success", result
    })
})
router.get("/books/genre", async (req, res, next) => {
    const result = await getBookByGenreFunc(req.query.genre)
    return res.status(200).json({
        message: "success", result
    })
})

router.get("/books/skip-limit", async (req, res, next) => {
    const result = await getBooksWithPaginationFunc()
    return res.status(200).json({
        message: "success", result
    })
})
router.get("/books/year-integer", async (req, res, next) => {
    const result = await findYearByTypeFunc()
    return res.status(200).json({
        message: "success", result
    })
})
router.get("/books/execlude-genres{/:genre1}{/:genre2}", async (req, res, next) => {
    const arr = []
    if (req.params.genre1) {
        arr.push(req.params.genre1)
        arr.push(req.params.genre2)
    } else {
        arr.push(req.query.genre1)
        arr.push(req.query.genre2)
    }
    const result = await getBooksWithoutFunc(arr)
    return res.status(200).json({
        message: "success", result

    })
})

router.delete("/books/before-year", async (req, res, next) => {
    const result = await deleteOldBooksFunc(req.query.year)
    return res.status(200).json({
        message: "success", result
    })
})

router.get("/books/aggregate1{/:year}", async (req, res, next) => {
    let data;
    if (req.params.year) {
        data = req.params.year;
    } else {
        data = req.query.year;
    }
    const result = await getBooksSortedFunc(data)
    return res.status(200).json({
        message: "success", result
    })
})
router.get("/books/aggregate2{/:year}", async (req, res, next) => {
    let data;
    if (req.params.year) {
        data = req.params.year;
    } else {
        data = req.query.year;
    }
    const result = await getBooksProjectedFunc(data)
    return res.status(200).json({
        message: "success", result
    })
})

router.get("/books/aggregate3", async (req, res, next) => {
    const result = await unwindGenresFunc()
    return res.status(200).json({
        message: "success", result
    })
})

router.get("/books/aggregate4", async (req, res, next) => {
    const result = await getBooksWithLogsFunc()
    return res.status(200).json({
        message: "success", result
    })
})
export default router