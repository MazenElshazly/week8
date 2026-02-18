import {
    createBooksCollection,
    indexCreate,
    createBook,
    insertBooksBatch,
    updateBook,
    findBook,
    getBooksByYearRange,
    getBooksByGenre,
    getBooksWithPagination,
    findYearByType,
    getBooksWithout,
    deleteOldBooks,
    getBooksProjected,
    getBooksSorted,
    unwindGenres,
    getBooksWithLogs
} from "../../DB/model/book.model.js"

export const createBookCollection = async () => {
    await createBooksCollection()
}

export const createIndex = async () => {
    await indexCreate()
}
export const addBook = async (data) => {
    await createBook(data)
}
export const bookBatch = async (data) => {
    return await insertBooksBatch(data)

}
export const updateBookfunc = async (name, year) => {


    await updateBook(name, year)
}
export const findBookFunc = async (data) => {
    return await findBook(data)
}

export const getBooksByYearRangeFunc = async (from, to) => {
    return await getBooksByYearRange(from, to)
}
export const getBookByGenreFunc = async (data) => {
    return await getBooksByGenre(data)
}
export const getBooksWithPaginationFunc = async () => {
    return await getBooksWithPagination()
}
export const findYearByTypeFunc = async () => {
    return await findYearByType()
}
export const getBooksWithoutFunc = async (data) => {
    return await getBooksWithout(data)
}
export const deleteOldBooksFunc = async (data) => {
    return await deleteOldBooks(data)
}
export const getBooksSortedFunc = async (data) => {
    return await getBooksSorted(data)
}
export const getBooksProjectedFunc = async (data) => {
    return await getBooksProjected(data)
}
export const unwindGenresFunc = async () => {
    return await unwindGenres()
}
export const getBooksWithLogsFunc = async () => {
    return await getBooksWithLogs()
}
