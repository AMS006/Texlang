import axios from "axios"
import { clearUser, setUser, setUserError, userRequest } from "../reducers/user"

export const LoginUser = ({email,password,code}) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const res = await axios({
            method: "POST",
            data: { email, password,code },
            url: "http://localhost:4000/api/user/login",
            withCredentials: true
        })
        localStorage.setItem("auth","true")
        dispatch(setUser(res.data.user));
        return res;
    } catch (error) {
        dispatch(setUserError(error?.response?.data?.message))
    }
}
export const getUser = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
       
        const res = await axios({
            method: "GET",
            url: "http://localhost:4000/api/user",
            withCredentials: true
        })
        dispatch(setUser(res.data.user))
    } catch (error) {
        dispatch(clearUser())
    }
}
export const logoutUser = () => async(dispatch) =>{
   try {
       await axios({
           method:"GET",
           url:"http://localhost:4000/api/user/logout",
           withCredentials:true
        })
        localStorage.removeItem("auth")
        dispatch(clearUser())
   } catch (error) {
        dispatch(setUserError(error?.response?.data?.message))
   }
}