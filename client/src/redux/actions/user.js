import axios from "axios"
import { clearUser, setUser, setUserError, userRequest } from "../reducers/user"
export const RegisterUser = (name,email,password) => async(dispatch) =>{
    try {
        await axios({
            method:"POST",
            url:"http://localhost:4000/api/user/register",
            data:{name,email,password}
        })
    } catch (error) {
        dispatch(setUserError(error.response.data.message))
    }
}
export const LoginUser = ({email,password,code}) => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const res = await axios({
            method: "POST",
            data: { email, password,code },
            url: "http://localhost:4000/api/user/login",
            withCredentials: true
        })

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`
        localStorage.setItem("authToken",JSON.stringify({token:res.data.token}))
        dispatch(setUser(res.data.user));
        return res;
    } catch (error) {
        dispatch(setUserError(error.response.data.message))
    }
}
export const getUser = () => async(dispatch) =>{
    try {
        dispatch(userRequest())
        const {token} = JSON.parse(localStorage.getItem('authToken'))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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
export const logoutUser = () => (dispatch) =>{
   localStorage.removeItem("authToken")
   dispatch(clearUser())
}