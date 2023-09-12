# Istrução de instalação do projeto

## instalar nodemon e quasar:

    # npm install nodemon
    # npm install -g @quasar/cli

## Criação do Banco de dados:
### Configurar conexão com o banco

    API_CRUD_BANCO\src\database\connection.js

### Criação da tabela contratos 

    CREATE TABLE contratos (
	contSid int NOT NULL AUTO_INCREMENT,
    contNum int NOT NULL, 
	contTipo Varchar(60),
	contNome Varchar(60),
	contDtIn date,
	contDtFim date,
	contRenovacaoAuto varchar(10),
	contPrazoDununcia int,
	contValor float, 
	contPrazoPGT int,
	contObjContrato varchar(30), 
	contIndiceAjuste varchar(10),
	contPenalidadeRescisao varchar(20)
	PRIMARY KEY(contSid)
)

## Iniciar programa

    dentro da pasta "API_CRUD_BANCO\" execute o comando **# npm start**, para iniciar a api.
    dentro da pasta "controle_contratos\" execute o comando **# npm start**, para iniciar o programa.
