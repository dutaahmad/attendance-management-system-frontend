// import { data } from "autoprefixer";
import { apiInstance } from "./api_instance";

export async function getPeople(token) {

    // let response = []

    return await apiInstance.request({
        url: "/people",
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

export async function addPeople(token, peopleRequestBody) {

    return await apiInstance.request(
        {
            url: "/people",
            method: "post",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: peopleRequestBody
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

export async function getPerson(token, personId) {

    // let response = []

    return await apiInstance.request({
        url: `/people/${personId}`,
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

export async function editPeople(token, person_id, peopleRequestBody) {

    return await apiInstance.request(
        {
            url: `/people/${person_id}`,
            method: "patch",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: peopleRequestBody
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