import Vue from 'vue'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.API_URL })

export { api }

Vue.prototype.$axios = axios
