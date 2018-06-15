import axios from 'axios'

const serverUrl = 'http://localhost:3141/api'

export const getNews = () => {
  return axios.get(`${serverUrl}/news`).then((response) => {
    console.log('response', response)
  })
}
