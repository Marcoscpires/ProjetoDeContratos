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
  const { id, contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao } = req.body;

  connection.query('UPDATE contratos SET contNum = ?, contTipo = ?, contNome = ?, contDtIn = ?, contDtfim = ?, contRenovacaoAuto = ?, contPrazoDununcia = ?, contValor = ?, contPrazoPGT = ?, contObjContrato = ?, contIndiceAjuste = ?, contPenalidadeRescisao = ? WHERE contSid = ?', [contNum, contTipo, contNome, contDtIn, contDtfim, contRenovacaoAuto, contPrazoDununcia, contValor, contPrazoPGT, contObjContrato, contIndiceAjuste, contPenalidadeRescisao, id], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar contrato' });
      return;
    }

    if (results.changedRows === 0) {
      res.status(404).json({ message: 'Contrato não encontrado ou os dados são iguais aos já existentes' });
      return;
    }

    res.status(200).json({ message: 'Contrato atualizado com sucesso' });
  });
});

/* DELETE */

app.delete('/contratos', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    res.status(400).json({ message: 'O ID do contrato é obrigatório' });
    return;
  }

  connection.query('DELETE FROM contratos WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir contrato' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Contrato não encontrado' });
      return;
    }
    
    res.status(200).json({ message: 'Contrato excluído com sucesso' });
  });
});

/* AQUI ADICIONA OS FUNCIONARIOS */


app.post('/funcionarios', function (req, res) {
  const { nome, cargo } = req.body;

  connection.query('INSERT INTO funcionarios (nome, cargo) values (?,?)', [nome,cargo], function (error, results){
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar funcionario' });
      return;
    }

    res.status(200).json({message: 'Funcioanrio cadastrado com sucesso'});
  });
});


/* AQUI SELECIONA OS FUNCIONARIOS */

app.get('/funcionarios', (req, res) => {
  connection.query('SELECT * FROM funcionarios', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar funcionarios' });
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


/* AQUI ATUALIZA OS FUNCIONARIOS */

app.put('/funcionarios', function (req, res) {
  const { id, nome, cargo} = req.body;

  connection.query('UPDATE funcionarios SET nome = ?, cargo = ? WHERE id = ?', [nome, cargo, id], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar funcionario' });
      return;
    }

    if (results.changedRows === 0) {
      res.status(404).json({ message: 'Funcioanrio não encontrado ou os dados são iguais aos já existentes' });
      return;
    }

    res.status(200).json({ message: 'Funcionarios atualizado com sucesso' });
  });
});


/*AQUI DELETA OS FUNCIONARIOS  */

app.delete('/funcionarios', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    res.status(400).json({ message: 'O ID do funcionario é obrigatório' });
    return;
  }

  connection.query('DELETE FROM funcioanrio WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir cliente' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Funcionario não encontrado' });
      return;
    }
    
    res.status(200).json({ message: 'Funcionario excluído com sucesso' });
  });
});

/*AQUI ADICIONA OS PRODUTOS  */

app.post('/produtos', function (req, res) {
  const { nome, preco } = req.body;

  connection.query('INSERT INTO produtos (nome, preco) values (?,?)', [nome,preco], function (error, results){
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao adicionar produto' });
      return;
    }

    res.status(200).json({message: 'Produto cadastrado com sucesso'});
  });
});

/*AQUI SELECIONA OS PRODUTOS  */

app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM produtos', (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar produtos' });
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

/*AQUI ATUALIZA OS PRODUTOS  */

app.put('/produtos', function (req, res) {
  const { id, nome, preco} = req.body;

  connection.query('UPDATE produtos SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id], function (error, results) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar produtos' });
      return;
    }

    if (results.changedRows === 0) {
      res.status(404).json({ message: 'Produtos não encontrado ou os dados são iguais aos já existentes' });
      return;
    }

    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  });
});

/*AQUI DELETA OS PRODUTOS  */

app.delete('/produtos', (req, res) => {
  const { id } = req.body;
  
  if (!id) {
    res.status(400).json({ message: 'O ID do produto é obrigatório' });
    return;
  }

  connection.query('DELETE FROM produtos WHERE id=?', [id], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir produtos' });
      return;
    }
    
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Produtos não encontrado' });
      return;
    }
    
    res.status(200).json({ message: 'Produtos excluído com sucesso' });
  });
});



app.post('/pedidos', (req, res) => {
  const { clienteId, itens } = req.body;
  
  // Verifica se o cliente existe no banco de dados
  connection.query('SELECT * FROM clientes WHERE id = ?', [clienteId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar cliente' });
      return;
    }
    
    if (results.length === 0) {
      res.status(404).json({ message: 'Cliente não encontrado' });
      return;
    }
    
    // Insere o pedido no banco de dados
    connection.query('INSERT INTO pedidos (clienteId, itens) VALUES (?, ?)', [clienteId, JSON.stringify(itens)], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar pedido' });
        return;
      }
      
      res.json({ message: 'Pedido criado com sucesso', id: results.insertId });
    });
  });
});



app.get('/pedidos', async (req, res) => {
  try {
    const pedidos = await buscarTodosPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
});



/// Rota para fechamento de pedidos e separação de conta
app.post('/fechar-pedido', async (req, res) => {
  const { pedidoId, quantidadePessoas } = req.body;

  try {
    const pedido = await getPedidoById(pedidoId);
    const valorTotal = await calcularValorTotalDoPedido(pedido.itens);

    if (quantidadePessoas < 1 || quantidadePessoas > 4) {
      res.status(400).json({ message: 'Quantidade de pessoas inválida' });
      return;
    }

    const valorPorPessoa = valorTotal / quantidadePessoas;
    res.json({ message: 'Conta fechada com sucesso', valorTotal, valorPorPessoa });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fechar pedido' });
  }
});

// Função para buscar detalhes do pedido pelo ID
function getPedidoById(pedidoId) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM pedidos WHERE id = ?', [pedidoId], (error, results) => {
      if (error) {
        reject(error);
      } else if (results.length === 0) {
        reject(new Error('Pedido não encontrado'));
      } else {
        resolve(results[0]);
      }
    });
  });
}

// Função para calcular o valor total do pedido
function calcularValorTotalDoPedido(itens) {
  return new Promise((resolve, reject) => {
    let valorTotal = 0;
    let processedItems = 0;

    for (const item of itens) {
      connection.query('SELECT preco FROM produtos WHERE id = ?', [item.produtoId], (error, results) => {
        if (error || results.length === 0) {
          reject(error || new Error('Produto não encontrado'));
        } else {
          const precoDoProduto = parseFloat(results[0].preco);
          valorTotal += precoDoProduto * item.quantidade;
        }

        processedItems++;

        if (processedItems === itens.length) {
          resolve(valorTotal);
        }
      });
    }
  });
}



// Função para buscar todos os pedidos
// No arquivo app.js, adicione a função buscarTodosPedidos
async function buscarTodosPedidos() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM pedidos', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}


// Rota para relatório de produção
app.get('/relatorio-producao', async (req, res) => {
  try {
    const relatorio = await gerarRelatorioDeProducao();
    res.json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao gerar relatório de produção' });
  }
});





app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});