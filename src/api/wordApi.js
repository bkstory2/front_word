import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

/* 일차 */
export const getDayList = () => api.get('/day/list')

/* 단어 */
export const getWordList = (dSeq) => api.get(`/word/list/${dSeq}`)

export const updateWord = (data) => api.post('/word/update', data)
