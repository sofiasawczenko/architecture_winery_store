# Microsserviço da Página de Pedidos

API simples de gerenciamento de pedidos de vinhos, construída com Node.js, Express, Prisma ORM e SQLite.

----

### Funcionalidades

- Criar pedidos
- Listar pedidos
- Atualizar pedidos
- Deletar pedidos
- Banco de dados local SQLite
- Integração com Postman para testes

### 1. Pré-requisitos

Antes de instalar o projeto, você precisa ter:

*Node.js*

- Baixe em: https://nodejs.org
- Versão recomendada: 18+

Para verificar:
```
node -v
npm -v
```

### 2. Clonar o projeto
```
git clone https://github.com/Recorder-FIAP/vinheria-pedidos.git
cd vinheria_pedidos
```

### 3. Instalar dependências
```
npm install
```

Isso instala:

- express
- prisma
- @prisma/client


### 4. Configurar o Prisma
Criar o arquivo .env:

No diretório raiz:

```
DATABASE_URL="file:./prisma/dev.db"
```

### 5. Criar o banco de dados e migrations
```
npx prisma migrate dev --name init
```

Sempre que alterar o schema:

```
npx prisma migrate dev --name update
```

### 6. Visualizar o banco (SQLite)

Use o Prisma Studio:

```
npx prisma studio
```

Abre o painel em:

```
http://localhost:5555
```

### 7. Executar o servidor
Node:
```
node index.js
```

Servidor disponível em:

```
http://localhost:3000
```

### 8. Testar no Postman
Criar um pedido (POST)

URL:
```
http://localhost:3000/pedidos
```

Body (JSON):
```
{
  "produto": "Vinho Malbec",
  "quantidade": 2,
  "cliente": "Sofia"
}
```

Listar pedidos (GET)
```
http://localhost:3000/pedidos
```

### Estrutura do projeto
```
vinheria_pedidos
│  index.js
│  package.json
│  .env
│
└───prisma
    │  schema.prisma
    │
    └───migrations
```

### Tecnologias usadas

- Node.js
- Express
- Prisma ORM
- SQLite
