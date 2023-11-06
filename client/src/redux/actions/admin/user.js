import axios from "axios"
import { clearAllUsers, getAllUserRequest, setAllUsers } from "../../reducers/user"
import { setHeaders } from "../../../helper/header"

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(getAllUserRequest())
        setHeaders()
        const users = await axios({
            method: "GET",
            url: "http://localhost:4000/api/admin/user/allUsers",
        })
        if (users)
                dispatch(setAllUsers(users.data.users))
    } catch (error) {
        dispatch(clearAllUsers())
    }
}