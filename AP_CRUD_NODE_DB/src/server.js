const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db'); 



const app = express();
const port = 3000;

app.use(bodyParser.json());



/* POST */

app.post('/contratos', function (req, res) {
  const { contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao } = req.body;

  connection.query('INSERT INTO contratos (contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao) values (?,?,?,?,?,?,?,?,?,?,?,?)', [contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao], function (error, results){
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar contratos' });
      return;
    }

    res.status(200).json({message: 'Contrato cadastrado com sucesso'});
  });
});

/* GET */

app.get('/contratos', (req, res) => {
  connection.query('SELECT * FROM contratos', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar contratos' });
      return;
    }

    res.status(200).json(results);
  });

  /*connection.end(error => {
    if (error) {
      console.error('Erro ao fechar a conexão:', error);
    } else {
      console.log('Conexão fechada.');
    }
  });*/
});

/* PUT */

app.put('/contratos', function (req, res) {
  const { id, nome, sobrenome, telefone, cpf } = req.body;

  connection.query('UPDATE clientes SET nome = ?, sobrenome = ?, telefone = ?, cpf = ? WHERE id = ?', [nome, sobrenome, telefone, cpf, id], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar cliente' });
      return;
    }

    if (results.changedRows === 0) {
      res.status(404).json({ message: 'Cliente não encontrado ou os dados são iguais aos já existentes' });
      return;
    }

    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  });
});

/* DELETE */

app.delete('/contratos', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    res.status(400).json({ message: 'O ID do cliente é obrigatório' });
    return;
  }

  connection.query('DELETE FROM clientes WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir cliente' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    
    res.status(200).json({ message: 'Cliente excluído com sucesso' });
  });
});
