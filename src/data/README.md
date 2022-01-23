<h1 align="center">
  Kenzie Burguer-API
</h1>

<p align = "center">
Este é o backend da aplicação Kenzie Burguer-API.
</p>

<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

## Rotas que precisam de autenticação

<h2 align ='center'> Login do usuário </h2>

`POST /login - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "joao.silva@mail.com",
  "password": "123456"
}
```

`POST /login - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW8uc2lsdmFAbWFpbC5jb20iLCJpYXQiOjE2MzY1Mzg4MDAsImV4cCI6MTYzNjU0MjQwMCwic3ViIjoiMSJ9.TU5DIB-qKkZgqleRKAiqvze3MssflsAaBKBB6-6jAgg",
  "user": {
    "email": "joao.silva@mail.com",
    "name": "João da Silva",
    "role": "administrador",
    "id": 1
  }
}
```

<h2 align ='center'> Criar usuário </h2>

`POST /signup - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "paulo.fontes@mail.com",
  "password": "123456",
  "name": "Paulo Fontes",
  "role": "usuario"
}
```

`POST /signup - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhdWxvLmZvbnRlc0BtYWlsLmNvbSIsImlhdCI6MTYzNjUzOTAxNywiZXhwIjoxNjM2NTQyNjE3LCJzdWIiOiI0In0.GdiQ0TlmvptXKz9yVSyJK--AJkVoHz2Z8qA-cU9aPbo",
  "user": {
    "email": "paulo.fontes@mail.com",
    "name": "Paulo Fontes",
    "role": "usuario",
    "id": 4
  }
}
```

<h2 align ='center'> Listar Produtos </h2>

`GET /products - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "title": "X-Salada",
    "category": "hamburgueres",
    "price": 8.9,
    "userId": 1,
    "id": 1
  },
  {
    "title": "Pepsi",
    "category": "bebidas",
    "price": 4.9,
    "userId": 1,
    "id": 2
  },
  {
    "title": "Batatas fritas",
    "category": "acompanhamentos",
    "price": 5.9,
    "userId": 1,
    "id": 3
  },
  {
    "title": "Sorvete Oreo",
    "category": "sobremesas",
    "price": 8.9,
    "userId": 1,
    "id": 4
  }
]
```

<h2 align ='center'> Cadastrar produto </h2>

`POST /products - FORMATO DA REQUISIÇÃO`

```json
{
  "title": "X-Maionese",
  "category": "hamburgueres",
  "price": 9.9,
  "userId": 1
}
```

`POST /products - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "title": "X-Maionese",
  "category": "hamburgueres",
  "price": 9.9,
  "userId": 1,
  "id": 9
}
```

<h2 align ='center'> Pegar lista de carrinhos </h2>

`GET /carts - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "userId": 2,
    "products": [
      {
        "title": "X-Maionese",
        "category": "hamburgueres",
        "price": 9.9,
        "userId": 1,
        "id": 9
      },
      {
        "title": "Pepsi",
        "category": "bebidas",
        "price": 4.9,
        "userId": 1,
        "id": 2
      }
    ],
    "id": 1
  }
]
```

<h2 align ='center'> Cadastrar carrinho </h2>

`POST /carts - FORMATO DA REQUISIÇÃO`

```json
{
  "userId": 1,
  "products": [
    {
      "title": "X-Maionese",
      "category": "hamburgueres",
      "price": 9.9,
      "id": 5
    }
  ]
}
```

`POST /carts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
  "userId": 1,
  "products": [
    {
      "title": "X-Maionese",
      "category": "hamburgueres",
      "price": 9.9,
      "id": 5
    }
  ],
  "id": 5
}
```

<h2 align ='center'> Apagar carrinho </h2>

`DELETE /carts/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{}
```
