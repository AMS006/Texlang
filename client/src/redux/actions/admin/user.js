import axios from "axios"
import { clearAllUsers, getAllUserRequest, setAllUsers } from "../../reducers/user"

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(getAllUserRequest())
        const users = await axios({
            method: "GET",
            url: "http://localhost:4000/api/admin/allUsers",
            withCredentials:true
        })
        if (users)
                dispatch(setAllUsers(users.data.users))
    } catch (error) {
        dispatch(clearAllUsers())
    }
}