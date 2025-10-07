comandos para subir o Banco de Dados *prisma*

npx prisma generate
npx prisma migrate dev --name init
npx prisma db push  --force-reset
npx prisma db push 
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