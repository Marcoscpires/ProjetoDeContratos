const database = require('../database/connection')
const { format } = require('date-fns')


class TaskController {
    inserirContratos(request, response){

        const {contNum, contTipo, contNome, contDtIn, contDtFim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao} = request.body
        
        database.insert({contNum, contTipo, contNome, contDtIn, contDtFim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao}).table("contratos").then(data=>{
            console.log(data)
            response.json({message:"Contrato cadastrato"})
        }).catch(error=>{
            console.log(error.errnor)
        })
    }
    listarContratos(request, response){
        database.select("*").table("contratos").then(contratos=>{
            const contratosFormatados = contratos.map(contrato => {
                return {
                    contSid: contrato.contSid,
                    contNum: contrato.contNum, 
                    contTipo: contrato.contTipo, 
                    contNome: contrato.contNome, 
                    contRenovacaoAuto: contrato.contRenovacaoAuto, 
                    contPrazoDununcia: contrato.contPrazoDununcia, 
                    contValor: contrato.contValor, 
                    contPrazoPGT: contrato.contPrazoPGT, 
                    contObjContrato: contrato.contObjContrato, 
                    contIndiceAjuste: contrato.contIndiceAjuste, 
                    contPenalidadeRescisao: contrato.contPenalidadeRescisao,
                    contDtIn: format(new Date(contrato.contDtIn), 'yyyy-MM-dd'),
                    contDtFim: format(new Date(contrato.contDtIn), 'yyyy-MM-dd')
                }
            })
            console.log(contratosFormatados)
            response.json(contratosFormatados)
        }).catch(error=>{
            console.log(error)
        })
    }
    listarUmContrato(request, response){
        const id = request.params
        database.select("*").table("contratos").where({contSid:id["id"]}).first().then(contrato=>{
            contrato.contDtIn = format(new Date(contrato.contDtIn), 'yyyy-MM-dd');
            contrato.contDtFim = format(new Date(contrato.contDtFim), 'yyyy-MM-dd');
            console.log(contrato)
            response.json(contrato)
        }).catch(error=>{
            console.log(error)
        })
    }

    excluirContrato(request, response){
        const id = request.params.id
        database.where({contSid:id}).del().table("contratos").then(data=>{
            response.json({message: "Contrato removido com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }

    atualizarContrato(request,response){
        const id = request.params.id
        const {contNum, contTipo, contNome, contDtIn, contDtFim, contRenovacaoAuto,
            contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao} = request.body
        database.where({ contSid: id }).update({contNum: contNum, contTipo: contTipo, 
            contNome: contNome, contDtIn: contDtIn, contDtFim: contDtFim, 
            contRenovacaoAuto: contRenovacaoAuto, contPrazoDununcia: contPrazoDununcia,
            contValor: contValor, contPrazoPGT: contPrazoPGT, contObjContrato: contObjContrato, contIndiceAjuste: contIndiceAjuste, contPenalidadeRescisao: contPenalidadeRescisao}).table("contratos").then(data => {
            response.json({message:"Contrato atualizado co sucesso"})
        }).catch(error => {
            response.json(error)
        })

    }
}

module.exports = new TaskController()