// import { data } from "autoprefixer";
import { apiInstance } from "./api_instance";

export async function getRole(token) {

    return await apiInstance.request({
        url: "/role",
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

export async function addRole(token, roleRequestBody) {

    return await apiInstance.request(
        {
            url: "/role",
            method: "post",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: roleRequestBody
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