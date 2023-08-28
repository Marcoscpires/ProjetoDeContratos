import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const response = await api.get(url)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const listById = async (id) => {
    try {
      const response = await api.get(`${url}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error)
    }
  }

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.id}`, form)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    listById,
    post,
    update,
    remove
  }
}
