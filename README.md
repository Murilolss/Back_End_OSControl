

comandos para subir o **Banco de Dados** *prisma*

npx prisma generate
npx prisma migrate dev --name init
npx prisma db push  --force-reset
npx prisma studio
npm run dev

remover o output do prisma client

CRUD
//C - CREATE, INSERT, POST, SET, STORE


ASYNC
// asincrono nome_da_função(recebendo, responder, próximo)

route.get('/:id', UserController.index); Significa que é dinamico e vira uma variavel

Criptografia

npm install bcrypt express-session nodemailer uuid
npm install jsonwebtoken

# Documentação da Api do Projeto

## Contexto 

OS Control é um aplicativo desenvolvido com a finalidade de facilitar o usuário na organização dos seus clientes no ambito que envolve Ordens de Serviços.
Esse aplicativo acima sitado está sendo desenvolvido pelos integrantes da turma TI43, sendo Murilo Leandro, Murilo Andrade, leonardo e Marcos.

comandos para subir o **Banco de Dados** *prisma*

npx prisma generate
npx prisma migrate dev --name init
npx prisma db push  --force-reset
npx prisma studio
npm run dev

remover o output do prisma client

## Modelagem de dados: tabelas, entidades ou estruturas jSON principais
 segue a abaixo link MER
![alt text](docs/images/MER_OSControl.png)



# Cliente

## Criar Cliente

Para Criar um Cliente utiliza-se a Rota de POST /Clients

### Cabeçalho

É Necessario passar o Cabeçalho content-type: application/json

### Requisição
No body é necesario passar as informações para o Cadastro do Cliente

```
"name": "Marcius",
"document": "111.222.333.44",
"cep": "12345-678",
"phone": "16 12345-6789",
"email": "marcius@gmail.com",
"address": "Rua Epscopal",
"number": 700,
"neighborhood" : "Centro",
"state": "São Paulo",
"city": "São Carlos"
```
### Resposta
401 Email inválido  
402 CPF ou  CNPJ Inválido  
201 Usuário Cadastrado com Sucesso  
500 Erro Interno

## Atualizar

Para Atualizar um Cliente utiliza-se a Rota de PUT /Clients

### Cabeçalho

É Necessario passar o Cabeçalho content-type: application/json

### Requisição
No body é necesario passar as informações do Cliente para serem atualizadas 

```
"name": "Marcius",
"document": "111.222.333.44",
"cep": "12345-678",
"phone": "16 12345-6789",
"email": "marcius@gmail.com",
"address": "Rua Epscopal",
"number": 700,
"neighborhood" : "Centro",
"state": "São Paulo",
"city": "São Carlos"
```

### Resposta
201 Cliente Atualizado com Sucesso
404 Nenhum Usuário Encontrado  
402 CPF ou  CNPJ Inválido  
201 Usuário Cadastrado com Sucesso  
500 Erro Interno

### Deletar

Para deletar um cliente utiliza-se a rota DELETE / clients

### Cabeçalho

É Necessario passar o Cabeçalho content-type: application/json

### Requisição
No body é necesario passar as informações do Cliente para serem deletadas. 


```
"name": "Marcius",
"document": "111.222.333.44",
"cep": "12345-678",
"phone": "16 12345-6789",
"email": "marcius@gmail.com",
"address": "Rua Epscopal",
"number": 700,
"neighborhood" : "Centro",
"state": "São Paulo",
"city": "São Carlos"
```   


    

# Ordem de Serviço
## Criar ordem de serviço
Para Criar uma nova Ordem de Serviço, utiliza-se a Rota de POST / order

### Cabeçalho

É Necessario passar o Cabeçalho content-type: application/json

### Requisição
No body é necesario passar as informações para o Cadastro da Ordem de Serviço

    "servicePrice" : 29,
    "productPrice" : 10,
    "userId" : 1,
    "serviceId" : 1,
    "clientId" : 1
  
## Resposta
Status Code:

   201: Cadastro com Sucesso!  
   301: Cliente informado não existe!  
   404: Nada encontrado!  
   200: Encontrado com Sucesso!


## Atualizar

Para Atualizar uma Ordem de Serviço, utiliza-se a Rota de PUT /order

### Cabeçalho

É Necessario passar o Cabeçalho content-type: application/json



    "servicePrice" : 29,
    "productPrice" : 10,
    "userId" : 1,
    "serviceId" : 1,
    "clientId" : 1





## ---------------------------------------------------------------------


## Product

# Rota
Post /product

# requisição
 Query:
 nenhum parâmetro

 body:
 data: { 
                    name, string;
                    category, string;
                    description, string;
                    salesUnit, string;
                    purchasePrice : Number(purchasePrice), 
                    salePrice : Number(salePrice), 
                    observations, string;
                    isActive : Boolean(isActive),
                    userId : Number(userId)
                }

# requisição
Query: identificador do produto


## Resposta
Status Code:

. 201: Produto criado com Sucesso!
. 301: Falha ao enontrar produto!
. 404: Produto não encontrado!

# Rota
Get/product/id

                {
                    "name" : "MSI B450",
                    "category" : "Placa Mãe",
                    "description" : "127v",
                    "salesUnit" : "UN", 
                    "purchasePrice" : 10, 
                    "salePrice" : 20, 
                    "observations" : "Azul",
                    "isActive" : true,
                    "userId" : 1

                }

## Resposta
Status Code:

. 200: Produto encontrado com Sucesso!
. 404: Produto não encontrado!


## -------------------------------------------------------------------

## service
Cria um novo serviço

# Rota
Post /order

# requisição
 Query:
 nenhum parâmetro

 body:

 Data : { 
                    nameService,
                    price: Number(price), 
                    description, string;
                    observations, string;
                    isActive: Boolean(isActive), 
                    userId: Number(userId)
                }


## Resposta
Status Code:

. 201: Serviço criado com Sucesso!
. 301: usuario informado não existe!
. 404: Erro interno !
. 500: Erro interno ao buscar serviços!

# Rota
Get/service/id

                {
                    "nameService" : "testee",
                    "price" : 20, 
                    "description" : "blabla", 
                    "observations" : "blabla2", 
                    "isActive" : true, 
                    "userId" : 1
                }

# requisição
Query: identificador do serviço


## Resposta
Status Code:

. 200: Serviço encontrado com Sucesso!
. 400: Serviço não encontrado!


## -----------------------------------------------------------------------

## Shop
Cria uma nova Compra

# Rota
Post /shop

# requisição
 Query:
 nenhum parâmetro

 body: 
 data:{ 
                orderId: Number(orderId),
                productId: Number(productId),
                amount: Number(amount),
                salePrice: Number(salePrice)
            }

 ## Resposta
Status Code:  

. 200  Encontrado com sucesso!
. 201 Erro ao encontrar !


# Rota
Get/shop/id

                {
                    "orderId": 1, 
                    "productId": 1, 
                    "amount": 1, 
                }

# requisição
Query: identificador da compra


## Resposta
Status Code:

. 200: Encontrado com Sucesso!
. 404: Não encontrado!

## --------------------------------------------------------------------

## Shop
Cria uma nova Assinatura

# Rota
Post /signature

# requisição
 Query:
 nenhum parâmetro

 body: 
 data: {
                    type,
                    isActive: Boolean(isActive),
                    userId: Number(userId)
                }
## Resposta
Status Code:  

. 200  Encontrado com sucesso!
. 404  Não encontrado !


# Rota
Get/signature/id

                {
                    "type" : "Basic",
                    "isActive": true,
                    "userId": 1
                }

# requisição
Query: identificador da assinatura


## Resposta
Status Code:

. 200: Encontrado com Sucesso!
. 404: Não encontrado!

## --------------------------------------------------------------------

## service
Cria um novo usuário

# Rota
Post / user

# requisição
 Query:
 nenhum parâmetro

 body:
                data: {
                    name, string;
                    lastName, string;
                    email, string ;
                    password: hash, number;
                    companyName, string;
                    corporateReason, string;
                    document, string;
                    stateRegistration, string;
                    cep, number;
                    address, string;
                    number, number; 
                    neighborhood, string;
                    state, string;
                    city, string;
                    phone, string;
                    site, string;
                    birth, string;
                    isActive: Boolean(isActive)
                }

## Resposta
Status Code:  

. 201  Encontrado com sucesso!
. 404  Não encontrado !


# Rota
Get/user/id

                {
                "name": "Murilo",
                "lastName": "Leandro",
                "email": "Muil0@yahoo.com",
                "password": "123456",
                "companyName": "ML Tech",
                "document": "67.681.940/0001-64",
                "corporateReason": "Murilo ltda",
                "cep": "12345-678",
                "address": "Rua Espcopal",
                "number": 700,
                "neighborhood": "Centro",
                "state": "São Paulo",
                "city": "São Carlos",
                "phone": "(16) 98250-7881",
                "site": "São Paulo",
                "birth": "1970-01-01T00:00:00.000Z",
                "isActive" : true
            }
# requisição
Query: identificador do usuário

## Resposta
Status Code:

. 200: Encontrado com Sucesso!
. 404: Não encontrado!



