const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')
var fileUpload = require('express-fileupload')
router.use(fileUpload())

router.post('/contratos', TaskController.inserirContratos)
router.get('/contratos',TaskController.listarContratos)
router.get('/contratos/:id',TaskController.listarUmContrato)
router.delete('/contratos/:id',TaskController.excluirContrato)
router.put('/contratos/:id',TaskController.atualizarContrato)
router.post('/file',TaskController.sendFile)

module.exports = router