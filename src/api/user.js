import { apiInstance } from "./api_instance";

export async function getUsers(token) {

    // let response = []

    return await apiInstance.request({
        url: "/users",
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        (res) => {
            console.log(res)
            return (res.data.data)
        }
    ).catch(
        (err) => (console.log(err))
    )

    // return response
}

export async function addUser(token, userRequestBody) {

    return await apiInstance.request(
        {
            url: "/users",
            method: "post",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: userRequestBody
        }
    ).then(
        (res) => {
            console.log(res)
        }
    ).catch(
        (error) => {
            console.log(error)
        }
    )

}