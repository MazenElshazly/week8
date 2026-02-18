import { db } from "../connection.db.js"



export const createBooksCollection = async () => {
    await db.createCollection("books", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title"],
                properties: {
                    title: {
                        bsonType: "string",
                        minLength: 1,
                        description: "Title is required and must be a non-empty string"
                    }
                }
            }
        }
    })
}


export const indexCreate = async () => {
    return await db.collection("books").createIndex({ title: 1 })
}


export const createBook = async (data) => {


    if (Array.isArray(data.genres)) {
        data.genres = data.genres.map(g => g.toLowerCase())
    }

    return await db.collection("books").insertOne({
        title: data.title,
        author: data.author,
        year: data.year,
        genres: data.genres
    });
};


export const insertBooksBatch = async (booksArray) => {

    if (booksArray.length < 3) {
        throw new Error("At least 3 book records are required")
    };

    for (let i = 0; i < booksArray.length; i++) {
        if (Array.isArray(booksArray[i].genres)) {
            booksArray[i].genres = booksArray[i].genres.map(g => g.toLowerCase())
        }

    }


    return await db.collection("books").insertMany(booksArray)
}
export const updateBook = async (name, year) => {

    return await db.collection("books").updateOne(
        { title: name },
        { $set: { year: year } }
    )
}

export const findBook = async (data) => {
    return await db.collection("books").findOne({ title: data })
}

export const getBooksByYearRange = async (from, to) => {
    return await db.collection("books").find({
        year: {
            $gte: Number(from),
            $lte: Number(to)
        }
    }).toArray()
}

export const getBooksByGenre = async (data) => {

    return await db.collection("books")
        .find({ genres: data })
        .toArray()
}


export const getBooksWithPagination = async () => {
    return await db.collection("books")
        .find()
        .sort({ year: -1 })
        .skip(2)
        .limit(3)
        .toArray()
}
export const findYearByType = async () => {
    return await db.collection("books")
        .find({ year: { $type: "int" } })
        .toArray()

}

export const getBooksWithout = async (data) => {
    return await db.collection("books")
        .find({
            genres: { $nin: [data[0], data[1]] }
        })
        .toArray()
}
export const deleteOldBooks = async (data) => {

    return await db.collection("books").deleteMany({ year: { $lt: Number(data) } });
};

export const getBooksSorted = async (data) => {

    return await db.collection("books").aggregate([
        { $match: { year: { $gt: Number(data) } } },
        { $sort: { year: -1 } }
    ]).toArray();
};

export const getBooksProjected = async (data) => {
    return await db.collection("books").aggregate([
        { $match: { year: { $gt: Number(data) } } },
        { $project: { _id: 0, title: 1, author: 1, year: 1 } }
    ]).toArray();
};
export const unwindGenres = async () => {
    return await db.collection("books").aggregate([
        { $unwind: "$genres" }
    ]).toArray();
};

export const getBooksWithLogs = async () => {
    return await db.collection("books").aggregate([
        {
            $lookup: {
                from: "logs",
                localField: "_id",
                foreignField: "id._id",
                as: "logs"
            }
        }
    ]).toArray();
};


