const database = require('../database/connection')
const { format } = require('date-fns')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

class TaskController {
    inserirContratos(request, response){
        const {contNum, contTipo, contNome, contDtIn, contDtFim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao} = request.body
         
        database.insert({contNum, contTipo, contNome, contDtIn, contDtFim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao}).table("contratos").then(data=>{
            response.json({message:"Contrato cadastrato"})
        }).catch(error=>{
            console.log(error.error)
        })
    }
    listarContratos(request, response){
        database.select("*").table("contratos").then(contratos=>{
            response.json(contratos)
        }).catch(error=>{
            console.log(error)
        })
    }
    listarUmContrato(request, response){
        const id = request.params.id
        database.select("*").table("contratos").where({contSid:id}).first().then(contrato=>{
            contrato.contDtIn = format(new Date(contrato.contDtIn), 'yyyy-MM-dd');
            contrato.contDtFim = format(new Date(contrato.contDtFim), 'yyyy-MM-dd');
            response.json(contrato)
        }).catch(error=>{
            console.log(error)
        })
    }

    async excluirContrato(request, response){
        const id = request.params.id
        let filename = ''
        let filePath = ''
        try {
            const numCont = await database.select("contNum").table("contratos").where({ contSid:id })
            filename = `${numCont[0].contNum}.pdf`
            filePath = path.join(__dirname, '..\\..\\uploads', filename)
            await database.where({contSid:id}).del().table("contratos")
            await fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Erro ao excluir o arquivo: ${err}`);
                } else {
                    console.log(`Arquivo ${filePath} excluído com sucesso.`);
                }
            })
            response.json({ message: "Contrato removido com sucesso" });
        } catch (error){
            console.log(error)
        }
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
        const id = request.params.id
        try {
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                cb(null, 'uploads/'); // Define a pasta de destino dos uploads
                },
                filename: (req, file, cb) => {
                const fileName = `${id}.pdf`;
                cb(null, fileName); // Define o nome do arquivo no servidor
                }
            })
            const upload = multer({ storage });
            upload.single('file') (request,response, (error) => {
                if (error) {
                    console.log('Erro ao fazer upload do arquivo.')
                    return response.status(400).json({error: 'Erro ao fazer upload do arquivo.'})
                }
                    console.log('Arquivo enviado com sucesso')   
            })
            database.where({ contNum: id }).update({ file: id }).table("contratos").then(data => {
                response.log('Contrato atualizado co sucesso')
            }).catch(error => {
                response.status(500).json(error)
            })
        }catch (error) {
            console.error(error)
            response.status(500).json({ error: 'Erro interno do servidor' })
        }
    }

    buscarArquivo(request,response) {
        const filename = `${request.params.id}.pdf`
        const filePath = path.join(__dirname, '..\\..\\uploads', filename)
        
        response.sendFile(filePath, (err) => {
            if (err) {
                response.status(500).json({ error: 'Erro ao baixar o arquivo'})
            }
        })
    }
}

module.exports = new TaskController()