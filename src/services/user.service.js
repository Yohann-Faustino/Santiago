import AxiosCall from "./axiosCall";

let getAllUsers = () => {
    return AxiosCall.get('/users')
}

let getUser = (uid) => {
    return AxiosCall.get('/users/'+uid)
}

export const userService = {
    getAllUsers, getUser
}