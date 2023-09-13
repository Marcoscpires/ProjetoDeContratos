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

module.exports = router