const database = require('../database/connection')

class TaskController {
    inserirContratos(request, response){

        const {contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao} = request.body
        
        database.insert({contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao}).table("contratos").then(data=>{
            console.log(data)
            response.json({message:"Contrato cadastrato"})
        }).catch(error=>{
            console.log(error)
        })
    }
    listarContratos(request, response){
        database.select("*").table("contratos").then(contratos=>{
            console.log(contratos)
            response.json(contratos)
        }).catch(error=>{
            console.log(error)
        })
    }
    listarUmContrato(request, response){
        const id = request.params

        database.select("*").table("contratos").where({contSid:id["id"]}).then(contrato=>{
            response.json(contrato)

        }).catch(error=>{
            console.log(error)
        })
    }

    excluirContrato(request, response){
        const id = request.params

        database.where({contSid:id["id"]}).del().table("contratos").then(data=>{
            response.json({message: "Contrato removido com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }

}

module.exports = new TaskController()