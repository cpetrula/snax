import axios from 'axios'

const API_BASE_URL = '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const uploadPhotos = async (formData) => {
  const response = await api.post('/photos/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getMealSuggestions = async (data) => {
  const response = await api.post('/meals/suggestions', data)
  return response.data
}

export const getMealDetails = async (id) => {
  const response = await api.get(`/meals/${id}`)
  return response.data
}

export const getAnalysis = async (id) => {
  const response = await api.get(`/photos/analysis/${id}`)
  return response.data
}