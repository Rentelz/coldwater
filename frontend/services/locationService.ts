import axios, { AxiosError } from "axios";

const API_KEY = process.env.NEXT_PUBLIC_LOCATION_SERVICE_API;
const BASE_URL = "https://api.countrystatecity.in/v1/countries/IN";

const api = axios.create({
  baseURL: "https://api.countrystatecity.in/v1",
  headers: { "X-CSCAPI-KEY": API_KEY },
});

export const getStates = async (countryCode = "IN") => {
  try {
    const response = await api.get(`/countries/${countryCode}/states`);
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
};

// export const getCities = async (countryCode = "IN", stateCode: string) => {
//   try {
//     const response = await api.get(
//       `/countries/${countryCode}/states/${stateCode}/cities`
//     );
//     console.log("API Response:", response);
//     console.log("Headers:", response.headers);
//     console.log("Data:", response.data);
//     return response.data;
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const axiosError = error as AxiosError;
//       console.error(
//         "Error fetching cities:",
//         axiosError.response?.data || axiosError.message
//       );
//     } else {
//       console.error("Unexpected error:", error);
//     }
//     return [];
//   }
// };


export const getCities = async (countryCode = "IN", stateCode: string) => {
  if (!stateCode) {
    console.error("Invalid stateCode:", stateCode);
    return [];
  }

  try {
    const response = await api.get(`/countries/${countryCode}/states/${stateCode}/cities`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
};
