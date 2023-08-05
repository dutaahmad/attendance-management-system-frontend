// import { data } from "autoprefixer";
import { apiInstance } from "./api_instance";

export const JWT_SECRET_KEY = "mY_JwT_s3CRe7_K3y"

export async function loginRequest(dataObjectParam) {

    return await apiInstance.request({
        url: "/auth/login",
        method: "post",
        data: dataObjectParam
    })
} 