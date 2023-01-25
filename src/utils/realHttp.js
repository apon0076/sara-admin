import axios from "axios"
const token = localStorage.getItem("x-access-token")

export default axios.create({
  baseURL: "http://192.168.2.231",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
    responseType: "json",
    Accept: "application/json",
  },
})
