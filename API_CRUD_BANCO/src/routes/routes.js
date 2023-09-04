const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
const multer = require('multer') 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.post('/contratos', TaskController.inserirContratos)
router.get('/contratos',TaskController.listarContratos)
router.get('/contratos/:id',TaskController.listarUmContrato)
router.delete('/contratos/:id',TaskController.excluirContrato)
router.put('/contratos/:id',TaskController.atualizarContrato)
router.post('/upload', upload.single('file'), (req,res) => {
    try {
        const file = req.file
        if (!file) {
          return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' })
        }
        // Você pode fazer o que quiser com o arquivo aqui, como salvar no banco de dados, processá-lo, etc.
        return res.status(200).json({ message: 'Arquivo enviado com sucesso.' })
    } catch (error) {
        console.error('Erro ao fazer upload do arquivo:', error)
        return res.status(500).json({ message: 'Erro interno do servidor.' })
    }
})

module.exports = router