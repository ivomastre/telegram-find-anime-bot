import { IUser } from "../models/user"
import UserModel from "../models/user/model"
const listUserScore = async (): Promise<IUser[]> => {
    const users = await UserModel.find().select("-_id").limit(10).sort({ score: -1 })
    return users
}

export default listUserScore;