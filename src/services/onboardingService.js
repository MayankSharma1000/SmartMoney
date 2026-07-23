import axios from "axios";
import { getAuthHeader } from "./authService";

import { API_URL } from "../config/api";

const AUTH_API_URL = `${API_URL}/auth`;

export const completeOnboarding = async (formData) => {

    const response = await axios.patch(
        `${AUTH_API_URL}/onboarding`,
        formData,
        getAuthHeader()
    );

    return response.data;

};