import { IUser } from "../models/user"
import UserModel from "../models/user/model"
import getUserScore from "./getUserScore"
const deductToUserScore = async (telegramId: string, userName: string): Promise<IUser> => {
    const user = await getUserScore(telegramId, userName)

    user.score += 1
    user.save()

    return user
}

export default deductToUserScore;