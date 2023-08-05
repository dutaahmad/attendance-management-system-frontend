// import { data } from "autoprefixer";
import { apiInstance } from "./api_instance";

export async function getEmployee(token) {

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
                        employee.role.role_name != "Murid"
                    )
                )
            )
        }
    ).catch(
        (err) => (console.log(err))
    )

    // return response
}

export async function addEmployee(token, employeeRequestBody) {

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

export async function getSingularEmployee(token, employee_id) {

    return await apiInstance.request({
        url: `/employee/${employee_id}`,
        method: "get",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(
        (res) => {
            console.log(res.data.data)
            return (
                res.data.data
            )
        }
    ).catch(
        (err) => (console.log(err))
    )
}

export async function editEmployee(token, employee_id, employeeRequestBody) {

    return await apiInstance.request(
        {
            url: `/employee/${employee_id}`,
            method: "patch",
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