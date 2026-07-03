import axios from "axios";
import { getAuthHeader } from "./authService";

const API_URL = "http://localhost:5500/api/auth";

export const completeOnboarding = async (formData) => {

    const response = await axios.patch(
        `${API_URL}/onboarding`,
        formData,
        getAuthHeader()
    );

    return response.data;

};