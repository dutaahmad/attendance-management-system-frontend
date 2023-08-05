// import { data } from "autoprefixer";
import { apiInstance } from "./api_instance";

export async function getStudent(token) {

    // let response = []

    return await apiInstance.request({
        url: "/employee",
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        (res) => {
            console.log(res)
            return (
                res.data.data.filter(
                    (employee) => (
                        employee.role.role_name === "Murid"
                    )
                )
            )
        }
    ).catch(
        (err) => (console.log(err))
    )

    // return response
}

export async function addStudent(token, employeeRequestBody) {

    return await apiInstance.request(
        {
            url: "/employee",
            method: "post",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: employeeRequestBody
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