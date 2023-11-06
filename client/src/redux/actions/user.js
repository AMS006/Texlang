import axios from "axios"
import { clearUser, setUser, setUserError, userRequest } from "../reducers/user"
import { setHeaders } from "../../helper/header"

export const LoginUser = (data) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const res = await axios({
            method: "POST",
            data,
            url: "http://localhost:4000/api/user/login",
        })
        localStorage.setItem("token",res.data.token)
        dispatch(setUser(res.data.user));
        return res;
    } catch (error) {
        dispatch(setUserError(error?.response?.data?.message))
    }
}
export const getUser = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
        setHeaders()
        const res = await axios({
            method: "GET",
            url: "http://localhost:4000/api/user",
        })
        dispatch(setUser(res.data.user))
    } catch (error) {
        dispatch(clearUser())
    }
}
export const logoutUser = () => async (dispatch) => {
    dispatch(clearUser())
    localStorage.removeItem("token")
}
   