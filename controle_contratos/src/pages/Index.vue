<template>
   <q-page padding>
    <div class="row q-pa-md q-gutter-md">
      <div class="col-12 q-gutter-md">
        <q-form
        @submit="onSubmit"
        class="q-gutter-md">
          <div class="row q-gutter-md">
            <div class="col-2 q-gutter-md column items-center self-center">
              <q-btn glossy label="Salvar" color="primary" class="float-right" icon="save" type="submit"></q-btn>
              <q-btn glossy label="Cancelar" color="write" class="float-right" text-color="primary"></q-btn>
            </div>
            <div class="col-9 q-gutter-sm row">
              <q-input outlined v-model="form.contNum" label="N Contrato" lazy-rules class="col-lg-1 col-xs-12" />
              <q-input outlined v-model="form.contTipo" label="Tipo" lazy-rules class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.contNome" label="Nome" lazy-rules class="col-lg-5 col-xs-12" />
              <q-input outlined v-model="form.contDtIn" label="Data inicio" mask="##/##/####" lazy-rules
                class="col-lg-2 col-xs-12" type="date">
              </q-input>
              <q-input outlined v-model="form.contRenovacaoAuto" label="Renovação automatica" lazy-rules
                class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.contPrazoDununcia" label="Prazo denuncia" lazy-rules class="col-lg-4 col-xs-12" />
              <q-input outlined v-model="form.contValor" label="Valor" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.contDtFim" label="Data fim" mask="##/##/####" lazy-rules
                class="col-lg-2 col-xs-12" type="date">
              </q-input>
              <q-input outlined v-model="form.contPrazoPGT" label="Prazo PGT" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.contObjContrato" label="Objeto de contrato" lazy-rules
                class="col-lg-3 col-xs-12" />
              <q-input outlined v-model="form.contIndiceAjuste" label="Indice de ajuste" lazy-rules class="col-lg-2 col-xs-12" />
              <q-input outlined v-model="form.contPenalidadeRescisao" label="Penalidade recisão" lazy-rules
                class="col-lg-2 col-xs-12" />
            </div>
          </div>
        </q-form>
      </div>
      <div class="col-12 q-gutter-md">
        <q-table  dense flat bordered :data="posts" :columns="columns" row-key="name">
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
      contNum: '',
      contTipo: '',
      contNome: '',
      contDtIn: '',
      contDtFim: '',
      contRenovacaoAuto: '',
      contPrazoDununcia: '',
      contValor: '',
      contPrazoPGT: '',
      contObjContrato: '',
      contIndiceAjuste: '',
      contPenalidadeRescisao: ''
    })
    return {
      form,
      columns: [
        { name: 'contSid', label: 'ID', field: 'contSid', sortable: true, aling: 'left' },
        { name: 'contNum', label: 'N Contrato', field: 'contNum', sortable: true, aling: 'left' },
        { name: 'contTipo', label: 'Tipo', field: 'contTipo', sortable: true, aling: 'left' },
        { name: 'contNome', label: 'Nome', field: 'contNome', sortable: true, aling: 'left' },
        { name: 'contDtIn', label: 'Data inicio', field: 'contDtIn', sortable: true, aling: 'left' },
        { name: 'contDtfim', label: 'Data fim', field: 'contDtFim', sortable: true, aling: 'left' },
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
      }).onOk(async () => {
        try {
          await remove(id)
          await this.getPosts()
        } catch (error) {
          console.error(error)
        }
      })
    },
    handleEditPost () {
      console.log('atualizado')
    },
    async onSubmit () {
      const { post } = postsService()
      console.log(this.form.value)
      try {
        await post(this.form)
      } catch (error) {
        console.error(error)
      }
      this.$q.notify({ message: 'Salvo', icon: 'check', color: 'positive' })
    }

  }
}
</script>
