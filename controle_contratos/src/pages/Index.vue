<template>
   <q-page padding>
    <div class="q-pa-md">
      <q-table flat bordered :data="posts" :columns="columns" row-key="name">
        <template v-slot:top>
          <span class="text-h5">Contratos</span>
          <q-space />
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
import { api } from 'boot/axios'
export default {
  name: 'IndexPage',
  data () {
    return {
      columns: [
        { name: 'contSid', label: 'ID', field: 'contSid', sortable: true, aling: 'left' },
        { name: 'contNum', label: 'N Contrato', field: 'contNum', sortable: true, aling: 'left' },
        { name: 'contTipo', label: 'Tipo', field: 'contTipo', sortable: true, aling: 'left' },
        { name: 'contNome', label: 'Nome', field: 'contNome', sortable: true, aling: 'left' },
        { name: 'contDtIn', label: 'Data inicio', field: 'contDtIn', sortable: true, aling: 'left' },
        { name: 'contDtfim', label: 'Data fim', field: 'contDtfim', sortable: true, aling: 'left' },
        { name: 'contRenovacaoAuto', label: 'Renovação Automatica', field: 'contRenovacaoAuto', sortable: true, aling: 'left' },
        { name: 'contPrazoDununcia', label: 'Prazo denuncia', field: 'contPrazoDununcia', sortable: true, aling: 'left' },
        { name: 'contValor', label: 'Valor', field: 'contValor', sortable: true, aling: 'left' },
        { name: 'contPrazoPGT', label: 'Prazo PGT', field: 'contPrazoPGT', sortable: true, aling: 'left' },
        { name: 'contObjContrato', label: 'Objeto de contrato', field: 'contObjContrato', sortable: true, aling: 'left' },
        { name: 'contIndiceAjuste', label: 'Indice de Ajuste', field: 'contIndiceAjuste', sortable: true, aling: 'left' },
        { name: 'contPenalidadeRescisao', label: 'Penalidade de recesão', field: 'contPenalidadeRescisao', sortable: true, aling: 'left' },
        { name: 'actions', label: 'Ações', field: 'actions', aling: 'right' }
      ],
      posts: []
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    getPosts () {
      api.get('contratos')
        .then((res) => {
          this.posts = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
