import axios from 'axios'

const api = axios.create({
    baseURL: 'https://node-acad.onrender.com',
    withCredentials: true, // 🔹 Permite enviar cookies de sessão
})

export default api