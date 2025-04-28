// // features/user/userAPI.ts
// import axios, { AxiosError } from 'axios'

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:5000/api/auth', // Remove 'updateProfile' from base URL
//   timeout: 10000,
//   withCredentials: true,
// })

// type CreateUserParams = {
//   token: string
//   updateData: any
// }

// export const createUserAPI = async ({
//   token,
//   updateData,
// }: CreateUserParams): Promise<any> => {
//   console.log('Sending user data:', updateData)
//   console.log('Token being sent:', token)

//   try {
//     const response = await axiosInstance.patch('/updateProfile', updateData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })

//     console.log('Response from server:', response.data)
//     return response.data
//   } catch (error: unknown) {
//     if (isAxiosError(error)) {
//       if (error.response) {
//         throw new Error(error.response.data?.message || 'Server Error')
//       } else if (error.request) {
//         throw new Error(
//           'No response from server. Check your internet connection.'
//         )
//       } else {
//         throw new Error('Axios error: ' + error.message)
//       }
//     }
//     throw new Error('An unexpected error occurred')
//   }
// }

// features/user/userAPI.ts
import axios, { AxiosError, isAxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  timeout: 10000,
  withCredentials: true,
})

type UpdateProfileData = {
  name?: string
  email?: string
  image?: string
  // Add more fields if needed
}

type CreateUserParams = {
  token: string
  updateData: UpdateProfileData
}

export const createUserAPI = async ({
  token,
  updateData,
}: CreateUserParams): Promise<any> => {
  console.log('Sending user data:', updateData)
  console.log('Token being sent:', token)

  try {
    const response = await axiosInstance.patch('/updateProfile', updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log('Response from server:', response.data)
    return response.data
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message)
      } else if (error.request) {
        throw new Error(
          'No response from server. Check your internet connection.'
        )
      } else {
        throw new Error('Axios error: ' + error.message)
      }
    }
    throw new Error('An unexpected error occurred')
  }
}
