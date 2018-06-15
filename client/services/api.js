import axios from 'axios'

const serverUrl = 'http://localhost:3141/api'

export const getNews = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${serverUrl}/allNews`).then((response) => {
      console.log('response', response)
      resolve(response.data)
    }).catch((error) => reject(error))
  })
}

export const signIn = (body) => {
  return new Promise((resolve, reject) => {
    axios.post(`${serverUrl}/login`, body).then((response) => {
      console.log('response', response)
      resolve(response.data)
    }).catch((error) => reject(error))
  })
}

export const signUp = (body) => {
  return new Promise((resolve, reject) => {
    axios.post(`${serverUrl}/registration`, body).then((response) => {
      console.log('response', response)
      resolve(response.data)
    }).catch((error) => reject(error))
  })
}
