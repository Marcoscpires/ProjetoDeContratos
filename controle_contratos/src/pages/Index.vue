<template>
   <q-page padding>
    <div class="row q-pa-md q-gutter-md">
      <div class="col-12 q-gutter-md">
        <q-form
        @submit="onSubmit"
        class="q-gutter-md">
          <div class="row q-gutter-md">
            <div class="col-1 q-gutter-md column items-center self-center">
              <q-btn glossy label="Salvar" color="primary" class="float-right" icon="save" type="submit"></q-btn>
              <q-btn glossy label="Cancelar" color="write" class="float-right" text-color="primary"></q-btn>
            </div>
            <div class="col-10 q-gutter-sm row">
              <q-input outlined v-model="form.numero_contrato" label="N Contrato" lazy-rules class="col-lg-1 col-xs-12" />
              <q-input outlined v-model="form.tipo" label="Tipo" lazy-rules class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.nome" label="Nome" lazy-rules class="col-lg-5 col-xs-12" />
              <q-input outlined v-model="form.data_inicio" label="Data inicio" mask="##/##/####" lazy-rules
                class="col-lg-2 col-xs-12" type="date">
              </q-input>
              <q-input outlined v-model="form.renovacao_automatica" label="Renovação automatica" lazy-rules
                class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.prazo_denuncia" label="Prazo denuncia" lazy-rules class="col-lg-4 col-xs-12" />
              <q-input outlined v-model="form.valor" label="Valor" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.data_fim" label="Data fim" mask="##/##/####" lazy-rules
                class="col-lg-2 col-xs-12" type="date">
              </q-input>
              <q-input outlined v-model="form.prazo_pgt" label="Prazo PGT" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.objeto_contrato" label="Objeto de contrato" lazy-rules
                class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.indice_ajuste" label="Indice de ajuste" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.penalidade_recisao" label="Penalidade recisão" lazy-rules
                class="col-lg-2 col-xs-12" />
              <q-file class="col-lg-2 col-xs-12" color="primary" v-model="contrato" label="Contrato">
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-12 q-gutter-md">
        <q-table flat bordered :data="posts" :columns="columns" row-key="name">
          <template v-slot:top>
            <span class="text-h5">Contratos</span>
            <q-space />
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-sm">
              <q-btn glossy icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.contSid)" />
              <q-btn glossy icon="print" color="green" dense size="sm" @click="handleDeletePost(props.row.id)" />
              <q-btn glossy icon="edit" color="info" dense size="sm"  @click="handleEditPost(props.row.id)" />
            </q-td>
          </template>
        </q-table>
      </div>
   </div>
  </q-page>
</template>

<script>
import postsService from 'src/services/posts'
export default {
  name: 'IndexPage',
  data () {
    const form = ({
      numero_contrato: '',
      tipo: '',
      nome: '',
      data_inicio: '',
      data_fim: '',
      renovacao_automatica: '',
      prazo_denuncia: '',
      valor: '',
      prazo_pgt: '',
      objeto_contrato: '',
      indice_ajuste: '',
      penalidade_recisao: ''
    })
    return {
      form,
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
    async getPosts () {
      const { list } = postsService()
      try {
        const data = await list()
        this.posts = data
      } catch (error) {
        console.error(error)
      }
    },
    handleDeletePost (id) {
      const { remove } = postsService()
      this.$q.dialog({
        title: 'Deletar contrato',
        message: 'Tem certeza que quer apagar esse contrato?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          remove(id)
          this.getPosts()
        } catch (error) {
          console.error(error)
        }
      })
    }

  }
}
</script>
