const database = require('../database/connection')
const { format } = require('date-fns')
const multer = require('multer') 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Define a pasta de destino dos uploads
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName); // Define o nome do arquivo no servidor
    },
})

const upload = multer({ storage });

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
            console.log(contratos)
            response.json(contratos)
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

    salvarArquivo(request,response) {
        try {
            upload.single('file')(request,response, (error) => {
                if(error) {
                    return response.status(400).json({error: 'Erro ao fazer upload do arquivo'})
                }
                return response.json({ message: 'Arquivo enviado com sucesso' });
            })
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
}

module.exports = new TaskController()