import { api } from 'boot/axios'

const list = async () => {
  try {
    const response = await api.get('contratos')
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
const listById = async (id) => {
  try {
    const response = await api.get(`contratos/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
const download = async (id) => {
  try {
    const response = await api.get(`contratos/download/${id}`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
const post = async (form) => {
  try {
    const { data } = await api.post('contratos', form)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
const upload = async (file, id) => {
  try {
    const { data } = await api.post(`/contratos/upload/${id}`, file)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
const update = async (form) => {
  try {
    const { data } = await api.put(`contratos/${form.contSid}`, form)
    return data
  } catch (error) {
    throw new Error(error)
  }
}
const remove = async (id) => {
  try {
    const { data } = await api.delete(`contratos/${id}`)
    return data
  } catch (error) {
    throw new Error(error)
  }
}

export {
  upload,
  download,
  list,
  listById,
  post,
  update,
  remove
}
