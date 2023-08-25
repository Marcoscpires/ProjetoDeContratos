<template>
 <q-page padding>
    <div class="q-pa-md">
      <q-table flat bordered :rows="posts" :columns="columns" row-key="name">
        <template v-slot:top>
          <span class="text-h5">Contratos</span>
          <q-space />
          <q-btn glossy color="primary" :disable="loading" label="Novo" :to="{ name: 'formPost' }" />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn glossy icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.id)" />
            <q-btn glossy icon="print" color="green" dense size="sm" @click="handleDeletePost(props.row.id)" />
            <q-btn glossy icon="edit" color="info" dense size="sm"  @click="handleEditPost(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import postsService from 'src/services/posts'

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const posts = ref([])
    const { list } = postsService()
    const columns = [
      { name: 'id', label: 'ID', field: 'id', sortable: true, aling: 'left' },
      { name: 'numero_contrato', label: 'N Contrato', field: 'numero_contrato', sortable: true, aling: 'left' },
      { name: 'tipo', label: 'Tipo', field: 'tipo', sortable: true, aling: 'left' },
      { name: 'nome', label: 'Nome', field: 'nome', sortable: true, aling: 'left' },
      { name: 'data_inicio', label: 'Data inicio', field: 'data_inicio', sortable: true, aling: 'left' },
      { name: 'data_fim', label: 'Data fim', field: 'data_fim', sortable: true, aling: 'left' },
      { name: 'renovacao_automatica', label: 'Renovação Automatica', field: 'renovacao_automatica', sortable: true, aling: 'left' },
      { name: 'prazo_denuncia', label: 'Prazo denuncia', field: 'prazo_denuncia', sortable: true, aling: 'left' },
      { name: 'valor', label: 'Valor', field: 'valor', sortable: true, aling: 'left' },
      { name: 'prazo_pgt', label: 'Prazo PGT', field: 'prazo_pgt', sortable: true, aling: 'left' },
      { name: 'objeto_contrato', label: 'Objeto de contrato', field: 'objeto_contrato', sortable: true, aling: 'left' },
      { name: 'indice_ajuste', label: 'Indice de Ajuste', field: 'indice_ajuste', sortable: true, aling: 'left' },
      { name: 'penalidade_recisao', label: 'Penalidade de recesão', field: 'penalidade_recisao', sortable: true, aling: 'left' },
      { name: 'actions', label: 'Ações', field: 'actions', aling: 'right' }
    ]

    onMounted(() => {
      getPosts()
    })

    const getPosts = async () => {
      try {
        const data = await list()
        posts.value = data
      } catch (error) {
        console.error(error)
      }
    }
    return {
      posts,
      columns
    }
  }
})
</script>
