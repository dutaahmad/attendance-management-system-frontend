import axios from "axios";

export const apiInstance = axios.create(
    {
        baseURL: (
            import.meta.env.VITE_API_URL
            // ||
            // "http://localhost:5000"
        ),
    }
)