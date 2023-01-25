import axios from "axios"
import Url from '../utils/baseUrl'
const token = localStorage.getItem("x-access-token")

export default axios.create({
  baseURL: Url,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
    responseType: "json",
    Accept: "application/json",
  },
})
