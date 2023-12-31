[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Sword Api

Este repositório faz parte do desafio da empresa Sword Health, sendo utilizado como exercício prático de desenvolvimento.

observação 1: Peço desculpas pelo descuido, mas após o prazo, percebi que faltavam alguns detalhes no readme, no dockerfile e no docker-compose. Agora eu os atualizei de acordo. Se essas mudanças não forem aceitáveis, eu entendo perfeitamente. No entanto, você pode replicar facilmente as informações da branch staging, pois todas foram definidas antes do prazo. Obrigado pela sua compreensão.

observação 2: Se a imagem do docker não funcionar porfavor verificar se o arquivo main.sh está com a quebra de linha LF

Sempre que faço um projeto à parte, como esse, e não conheço os padrões que a empresa utiliza, tento seguir as boas práticas de código adotadas nesses dois projetos: [NodeBestPraticies](https://github.com/goldbergyoni/nodebestpractices) e [CleanCode](https://github.com/ryanmcdermott/clean-code-javascript)

Acesse um dos links a seguir para ler em outros idiomas: [English](README.md)

### Estrutura de Pastas
```
### Layout típico de diretório top-level

.
├── .husky                  # Consfigurações do husky
├── env                     # Pasta com os arquivos env
├── node_modules            # Onde as dependências estão instaladas
├── src                     # Pasta Raiz
├── test                    # Pasta dos arquivos de teste
├── .editorconfig
├── .eslintignore
├── .sequelizerc            # Configuração do caminho das pastas do sequelize
├── commitlint.config.js    # Configuração para padronização dos commits
├── docker-compose.yml      #
├── Dockerfile              #
├── index.js                # Ponto de entrada da api
├── insomniaFile.json       # Arquivo com as rotas da aplicação para rodar no insomnia
├── jest.config.js          # Configurações do jest
├── jest.setup.js           # Mais configurações antes da execução do teste
├── k8s.yaml                # Configuração do kubernetes
├── package.json
├── README.pt.md
└── README.md

```

```
### Src directory layout

src
├── config          # Arquivos de configuração
├── lib             # Funcionalidades usadas por muitos componentes
├── middlewares     #
├── modules         # Principais componentes
└── sequelize       # Modelos e migrações do sequelize
```

### Instalação

Sword Api requer o [Node.js](https://nodejs.org/), [Mysql](https://www.mysql.com/) e [RabbitMQ](https://www.rabbitmq.com/) para ser executado.

Instale as dependências e execute o aplicativo da seguinte maneira:

```sh
$ git clone https://github.com/chanudinho/sword-api.git
$ cd sword-api
$ npm install
$ npm start
```

### Scripts Disponíveis

No diretório do projeto, você pode executar:

#### `npm start`

Executa a API.<br>
use a url [http://localhost:3333](http://localhost:3333) para testar no Postman ou aplicativo de sua escolha.

#### `npm run dev`

Executa a API no modo de desenvolvimento.<br>
use a url [http://localhost:3333](http://localhost:3333) para testar no Postman ou aplicativo de sua escolha.

O aplicativo é atualizado automaticamente se você fizer edições.<br>
Você irá ver os erros no console da aplicação.


#### `npm run test`

Executa os testes da API
