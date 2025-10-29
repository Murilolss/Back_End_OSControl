

comandos para subir o **Banco de Dados** *prisma*

npx prisma generate
npx prisma migrate dev --name init
npx prisma db push  --force-reset
npx prisma db push 
npx prisma studio
npm run dev

remover o output do prisma client

# CRUD
//C - CREATE, INSERT, POST, SET, STORE


# ASYNC
// asincrono nome_da_função(recebendo, responder, próximo)

route.get('/:id', UserController.index); Significa que é dinamico e vira uma variavel

# Criptografia

npm install bcrypt express-session nodemailer uuid
npm install jsonwebtoken

# Documentação da Api do Projeto

## Contexto 

OS Control é um aplicativo desenvolvido com a finalidade de facilitar o usuário na organização dos seus clientes no ambito que envolve Ordens de Serviços.
Esse aplicativo acima sitado está sendo desenvolvido pelos integrantes da turma TI43, sendo Murilo Leandro, Murilo Andrade, leonardo e Marcos.

# comandos para subir o **Banco de Dados** *prisma*

npx prisma generate
npx prisma migrate dev --name init
npx prisma db push  --force-reset
npx prisma studio
npm run dev

remover o output do prisma client

# Tabela de erros dos Enpoints 
status code:  

301 - Não existe!   
401 - Email inválido  
402 - CPF ou  CNPJ Inválido   
404 - Não Encontrado!   
500 - Erro Interno


## Modelagem de dados: tabelas, entidades ou estruturas jSON principais
 segue a abaixo link MER
![alt text](docs/images/MER_OSControl.png)



# Cliente

## Criar Cliente

Para Criar um Cliente utiliza-se a Rota de POST /Clients

### Cabeçalho
È necessário passar o cabeçalho:

```   
content-type: application/json
```

### Requisição
No body é necessário passar as informações para Criar um Cliente.

```json
    {  
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

    } 
```

### Resposta 
```json
    {
        "name" : "Marcius",
        "document" : "111.222.333.44",
        "cep" : "12345-678",
        "phone" : "16 12345-6789",
        "email" : "marcius@gmail.com",
        "address" : "Rua Epscopal",
        "number" : 700,
        "neighborhood" : "Centro",
        "state" : "São Paulo",
        "city" : "São Carlos",
        "isActive" : true,
        "userId" : 1
        
    }
```
### Resposta
Status code:  

201 Sucesso !



## Atualizar

Para Atualizar um Cliente utiliza-se a Rota de PUT /Clients

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```

### Requisição
No body é necesario passar as informações do Cliente para serem atualizadas 

```json
    {  
    "name": "Marcius",
    "document": "111.222.333.44",
    "cep": "12345-678",
    "phone": "16 12345-6789",
    "email": "marcius@gmail.com",
    "address": "Rua Epscopal",
    "number": 700,
    "neighborhood" : "Centro",
    "state": "São Paulo",
    "city": "São Carlos",
    "userId": 2
    } 
```

### Resposta

```json
    {
        "name" : "Marcius",
        "document" : "111.222.333.44",  
        "phone": "16 12345-6700",
        "cep" : "12345-000", 
        "number": 800,
    }

```
Status code:  

201  Sucesso!


## Deletar

Para deletar um cliente utiliza-se a rota DELETE / clients

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```

### Requisição
No body é necesario passar as informações do Cliente para serem deletadas. 


```json
    {  
    "name": "Marcius",
    "document": "111.222.333.44",
    "cep": "12345-678",
    "phone": "16 12345-6789",
    "email": "marcius@gmail.com",
    "address": "Rua Epscopal",
    "number": 700,
    "neighborhood" : "Centro",
    "state": "São Paulo",
    "city": "São Carlos",
    "userId": 2
    } 
```
### Resposta

```
{
  "error": "não encontrado"
}
```
status code:  

404 - Não Encontrado!  
    

# Ordem de Serviço    
## Criar ordem de serviço
Para Criar uma nova Ordem de Serviço, utiliza-se a Rota de POST / order.

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```
### Requisição
No body é necessário passar as informações, para o Cadastro da Ordem de Serviço.

 ```json
    {

    "servicePrice" : 29,
    "productPrice" : 10,
    "userId" : 1,
    "serviceId" : 1,
    "clientId" : 1
  
    }
 ```
### Resposta
Status Code:

   201: Cadastro com Sucesso!  
   

## Atualizar

Para Atualizar uma Ordem de Serviço, utiliza-se a Rota de PUT /order

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```

### Requisição
No body é necesario passar as informações, para as Ordens de Serviço serem atualizadas. 

```json
{

    "servicePrice" : 29,
    "productPrice" : 10,
    "userId" : 1,
    "serviceId" : 1,
    "clientId" : 1
}
```
## Resposta

```json
{
    "salePrice" : 24,
    "servicePrice" : 30,
    "productPrice" : 14
}
```
200 Atualizado com Sucesso!  



## Deletar

Para deletar uma Ordem de Serviço utiliza-se a rota DELETE / order.

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```

### Requisição
No body é necessário passar o ID para  a Ordem de Serviço ser deletada.

```jason
{
    "clientId" : 1

}
  ```
### Resposta

```
{
  "error": "não encontrado"
}
```
status code:  

404 - Não Encontrado!   




# Produto
## Criar um produto

Para Criar uma Produto, utiliza-se a Rota de POST / product.

### Cabeçalho

É  necessário passar o cabeçalho:

```   
content-type: application/json
```
### Requisição
No body é necessário passar as informações, para  criar um produto.








### Resposta

```json
{
  "id": 1,
  "name": "MSI B450",
  "category": "Placa Mãe",
  "description": "127v",
  "salesUnit": "UN",
  "purchasePrice": 10,
  "salePrice": 20,
  "observations": "Azul",
  "isActive": true,
  "createdAt": "2025-10-29T20:18:16.769Z",
  "updatedAt": "2025-10-29T20:18:16.769Z",
  "userId": 1
}
```



# Service





 {
  "id": 2,
  "nameService": "limpeza",
  "price": 20,
  "description": "limnpeza cpu",
  "observations": "ultima limpeza 2 anos",
  "isActive": true,
  "createdAt": "2025-10-29T19:55:37.667Z",
  "updatedAt": "2025-10-29T19:55:37.667Z",
  "userId": 1
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



