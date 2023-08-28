import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { list, post, update, remove, listById } = useApi('contratos')

  return {
    list,
    listById,
    post,
    update,
    remove
  }
}
