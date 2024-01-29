<template>
   <q-page padding>
    <div class="row q-pa-md q-gutter-md justify-center">
      <div class="col-12 q-gutter-md">
        <q-form
        ref="meuFormulario"
        @submit="onSubmit"
        class="q-gutter-md">
          <div class="row justify-center">
            <div class="col-8 q-gutter-xs row">
              <q-input outlined v-model="form.contNum" ref="numeroCont" label="N Contrato" lazy-rules class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']" />
              <q-input outlined v-model="form.contTipo" label="Tipo" lazy-rules class="col-lg-3 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contNome" label="Nome" lazy-rules class="col-lg-4 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contDtIn" label="Data inicio" mask="date" lazy-rules
                class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio', 'date']">
                <template v-slot:append>
                  <q-icon name="event">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.contDtIn">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input outlined v-model="form.contRenovacaoAuto" label="Renovação automatica" lazy-rules
                class="col-lg-3 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contPrazoDununcia" label="Prazo denuncia" lazy-rules class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contValor" label="Valor" lazy-rules class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
                <q-input outlined v-model="form.contPrazoPGT" label="Prazo PGT" lazy-rules class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']" />
                <q-input outlined v-model="form.contDtFim" label="Data fim" mask="date" lazy-rules
                class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']">
                <template v-slot:append>
                  <q-icon name="event">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="form.contDtFim">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fechar" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input outlined v-model="form.contObjContrato" label="Objeto de contrato" lazy-rules
                class="col-lg-3 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contIndiceAjuste" label="Indice de ajuste" lazy-rules class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-input outlined v-model="form.contPenalidadeRescisao" label="Penalidade recisão" lazy-rules
                class="col-lg-2 col-xs-12" :rules="[val => !!val || 'Campo obrigatorio']"/>
              <q-file outlined v-model="arquivo" label="Contrato" class="col-lg-2 col-xs-12"  accept="application/pdf">
                <template v-slot:append>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <div class="col-lg-2 col-xs-12">
                <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"></q-btn>
                <q-btn label="Cancelar" color="red" class="float-right" @click="clearForm()" flat></q-btn>
              </div>
              </div>
          </div>
        </q-form>
      </div>
      <div class="col-9 q-gutter-md">
        <q-table  dense flat bordered :data="posts" :columns="columns" row-key="name">
          <template v-slot:top>
            <span class="text-h5">Contratos</span>
            <q-space />
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props" class="q-gutter-sm">
              <q-btn glossy icon="delete" color="negative" dense size="sm" @click="handleDeletePost(props.row.contSid)" />
              <q-btn glossy icon="print" v-if="mostraBotao(props.row.file)" color="green" dense size="sm" @click="downloadFile(props.row.contNum)" />
              <q-btn glossy icon="edit" color="info" dense size="sm"  @click="handleEditPost(props.row.contSid)" />
            </q-td>
          </template>
        </q-table>
      </div>
   </div>
  </q-page>
</template>

<script>
import { list, post, remove, listById, update, upload, download } from 'src/services/UseApi'
export default {
  name: 'IndexPage',
  data () {
    const form = ({
      contSid: '',
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
      arquivo: null,
      form,
      columns: [
        { name: 'contNum', label: 'Nº', field: 'contNum', sortable: true, aling: 'left' },
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
    mostraBotao (valor) {
      return valor !== null
    },

    clearForm () {
      this.form = ({
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
      this.arquivo = null
      this.$refs.meuFormulario.reset()
    },

    async getPosts () {
      try {
        const data = await list()
        this.posts = data
      } catch (error) {
        console.error(error)
      }
    },

    handleDeletePost (id) {
      this.$q.dialog({
        title: 'Deletar contrato',
        message: 'Tem certeza que quer apagar esse contrato?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await remove(id)
          await this.getPosts()
          this.$q.notify({ message: 'Contrato excluido', icon: 'delete', color: 'positive' })
        } catch (error) {
          console.error(error)
        }
      })
    },

    async downloadFile (id) {
      window.open(`http://187.49.94.173:4321/contratos/download/${id}`)
    },

    async handleEditPost (id) {
      console.log(this.form)
      const data = await listById(id)
      console.log(data)
      this.arquivo = download(this.form.contNum)
      this.form = data
      console.log(this.form)
    },

    async postContratos (form, file) {
      try {
        await post(form)
      } catch (error) {
        console.log(error)
      }
    },

    async uploadFile (id) {
      const formData = new FormData()
      if (this.arquivo !== null) {
        formData.append('file', this.arquivo)
        try {
          await upload(formData, id)
        } catch (error) {
          console.log(error)
        }
      }
    },

    async updateContratos (form) {
      await update(form)
      await this.getPosts()
    },

    async onSubmit () {
      try {
        if (this.form.contSid) {
          await this.updateContratos(this.form, this.file)
          await this.uploadFile(this.form.contNum)
          await this.getPosts()
          this.clearForm()
          this.$refs.meuFormulario.reset()
        } else {
          await this.postContratos(this.form)
          await this.uploadFile(this.form.contNum)
          await this.getPosts()
          this.clearForm()
          this.$refs.meuFormulario.reset()
          this.$q.notify({ message: 'Salvo', icon: 'check', color: 'positive' })
        }
      } catch (error) {
        console.error(error)
      }
    }

  }
}
</script>
