import AxiosCall from "./axiosCall";

let getAllUsers = () => {
    return AxiosCall.get('/customers')
}

let getUser = (uid) => {
    return AxiosCall.get('/customers/'+uid)
}

export const userService = {
    getAllUsers, getUser
}