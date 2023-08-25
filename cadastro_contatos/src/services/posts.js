import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { list, post, update, remove, listById } = useApi('posts')

  return {
    list,
    listById,
    post,
    update,
    remove
  }
}
