import { apiInstance } from "./api_instance";

export async function attendanceRequest(dataObjectParam, token) {

    return await apiInstance.request({
        url: "/attendance",
        method: "post",
        data: dataObjectParam,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
} 