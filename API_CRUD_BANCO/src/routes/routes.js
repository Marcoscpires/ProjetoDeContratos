const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/TaskController')

router.post('/contratos', TaskController.inserirContratos)
router.post('/upload/:id', TaskController.salvarArquivo)
router.get('/contratos',TaskController.listarContratos)
router.get('/contratos/:id',TaskController.listarUmContrato)
router.delete('/contratos/:id',TaskController.excluirContrato)
router.put('/contratos/:id',TaskController.atualizarContrato)



module.exports = router