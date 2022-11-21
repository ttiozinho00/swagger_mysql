

## Para executar este projeto

- Execute o script localizado em "/docs/crud.sql" para criar o banco de dados no MySQL Workbench ou em outro programa de sua preferência.

- Instale os módulos do nó executando os comandos abaixo na pasta raiz:

```batch
    npm install ou yarn install
```

- inicia a aplicação da API:

```batch
    npm run dev ou yarn dev
```

- Acesse a URL:

```batch
    http://localhost:3000
```

![Alt Text](/docs/swagger.JPG)

## Como funciona

A estrutura do projeto é essa:

![Alt Text](/docs/node01.JPG)

 "server.js" arquivo cria um pool MySQL para permitir múltiplas conexões:

![Alt Text](/docs/node02.JPG)

O "/config/config.json" contém conexões de banco de dados para diferentes ambientes. Eles são usados pelo "/models/index.js" arquivo durante a inicialização do Sequelize:

![Alt Text](/docs/node03.JPG)

O "/models" pasta contém os modelos de tabela Sequelize. Por exemplo: o "profiles" modelo.

![Alt Text](/docs/node04.JPG)

O "users" modelo faz referência ao "profiles" modelo:

![Alt Text](/docs/node05.JPG)

O "/plugins/transaction.js" é responsável por fazer o commit e rollback da transação:

![Alt Text](/docs/node06.JPG)

O "/controllers/users.js" hsão os GET/POST/PUT/DELETE metodos:

![Alt Text](/docs/node07.JPG)
