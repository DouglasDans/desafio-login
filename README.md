# Desafio Login

## Tecnologias Utilizadas
- Django (Python)
- React (Next.js)
- TypeScript
- Docker
- SQLite

## Como Executar o Projeto
Para facilitar a execução, é possível rodar o projeto via Docker ou de forma nativa no sistema.

### Executando com Docker
Para executar via Docker, basta rodar o seguinte comando:

```sh
npm run docker

# ou

docker compose up
```

É necessário ter o **Docker** instalado para a execução.

### Executando Diretamente
Para rodar o projeto diretamente, execute os seguintes comandos em diferentes instâncias do terminal:

```sh
# Iniciar o frontend
npm run frontend:install
npm run frontend

# Iniciar o backend
npm run backend:install
npm run backend
```

É necessário ter o **Node.js 18+ e Python 3+** instalados.

Os endpoints estarão disponíveis nos seguintes endereços:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:8000](http://localhost:8000)

