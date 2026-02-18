
import {
    logCollection,
    addlog
} from "../../DB/model/logs.model.js"
import { ObjectId } from 'mongodb'
export const createLogsCollection = async () => {
    await logCollection()
}
export const addlogfunc = async (id, action) => {
    const user = await addlog({ _id: ObjectId.createFromHexString(id) }, action)
    return user
}