[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Sword Api

This repository is an integral part of Sword Health's challenge, serving as a practical development exercise.

Whenever I do a separate project, like this one, and I don't know the standards that the company uses, I try to follow the good code practices adopted in these two projects: [NodeBestPraticies](https://github.com/goldbergyoni/nodebestpractices) e [CleanCode](https://github.com/ryanmcdermott/clean-code-javascript)

Read this in other languages: [Português](README.pt.md)

### Folder Structure
```
### A typical top-level directory layout

.
├── .husky                  # Husky settings
├── env                     # Folder with env files
├── node_modules            # All dependencies installed
├── src                     # Source files
├── test                    # Test files
├── .editorconfig
├── .eslintignore
├── .sequelizerc            # Setting up the path of the sequelize folders
├── commitlint.config.js    # Settings to keep a standard commit
├── docker-compose.yml      #
├── Dockerfile              #
├── index.js                # Entry point of api
├── insomniaFile.json       # Insomnia route collection
├── jest.config.js          # Jest settings
├── jest.setup.js           # More settings before test run
├── k8s.yaml                # kubernetes settings
├── package.json
├── README.pt.md
└── README.md

```

```
### Src directory layout

src
├── config          # Configuration files
├── lib             # Functionality used by many components
├── middlewares     #
├── modules         # Main components
└── sequelize       # Models and migrations of sequelize
```

### Installation

Sword Api requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and run the app.

```sh
$ git clone https://github.com/chanudinho/sword-api.git
$ cd sword-api
$ npm install
$ npm start
```

### Available Scripts

In the project directory, you can run:

### `npm start`
Run the API<br>
Use [http://localhost:3333](http://localhost:3333) to test on Postman or application of your choice.

#### `npm dev`

Run the API in the development mode.<br>
Use [http://localhost:3333](http://localhost:3333) to test on Postman or application of your choice.

The application is updated automatically if you make edits.<br>
You will also see any errors in the console.

#### `npm run test`

Run the API tests
