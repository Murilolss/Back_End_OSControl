import prisma from "../prisma.js";

export const ClientController = {
  async store(req, res, next) {
    try {
      const { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive } = req.body;

      // Validação de Campo Vazio
      function campoVazio(campo) {
        // Se for null, undefined ou vazio
        if (campo === null || campo === undefined) {
          return true;
        }

        // Se for string, verifica se tem texto (ignora espaços)
        if (typeof campo === "string") {
          return campo.trim().length === 0;
        }

        // Se for número, verifica se é NaN ou se é igual a 0 (caso queira considerar 0 como "vazio")
        if (typeof campo === "number") {
          return isNaN(campo);
        }

        // Se for qualquer outro tipo (ex: objeto, array), considera "não vazio"
        return false;
      }

      // Verificação de CPF/CNPJ Valido
      function validaCpfCnpj(documento) {
        const doc = String(documento).replace(/[^\d]/g, "");

        if (doc.length === 11) {
          if (/^(\d)\1{10}$/.test(doc)) return false;

          let soma = 0;

          for (let i = 1; i <= 9; i++) {
            soma += parseInt(doc.substring(i - 1, i)) * (11 - i);
          }
          let resto = (soma * 10) % 11;
          if (resto === 10 || resto === 11) resto = 0;
          if (resto !== parseInt(doc.substring(9, 10))) return false;

          soma = 0;
          for (let i = 1; i <= 10; i++) {
            soma += parseInt(doc.substring(i - 1, i)) * (12 - i);
          }
          resto = (soma * 10) % 11;
          if (resto === 10 || resto === 11) resto = 0;
          return resto === parseInt(doc.substring(10, 11));
        }

        if (doc.length === 14) {
          const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
          if (/^(\d)\1{13}$/.test(doc)) return false;

          let n = 0;
          for (let i = 0; i < 12; i++) {
            n += doc[i] * b[i + 1];
          }
          if (doc[12] != (n % 11 < 2 ? 0 : 11 - (n % 11))) return false;

          n = 0;
          for (let i = 0; i <= 12; i++) {
            n += doc[i] * b[i];
          }
          return doc[13] == (n % 11 < 2 ? 0 : 11 - (n % 11));
        }

        return false;
      }

      // Verificação de Email Valido
      function validaemail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }

      if (campoVazio(name)) {
        return res.status(400).json({error:"Preencha o campo Nome"});
      }

      if (campoVazio(document)) {
        return res.status(400).json({error:"Preencha o campo CPF ou CNPJ"});
      }

      //validação de CPF ou CNPJ existente
      const documentt = await prisma.client.findFirst({
        where: { document }
      })

      if (documentt) {

        if (document.length === 14) {
          return res.status(409).json({error:"Já existe um Cliente Cadastrado com esse CPF"});
        }
        else if (document.length === 18) {
          return res.status(409).json({error:"Já existe um Cliente Cadastrado com esse CNPJ"});
        }
      }


      if (!validaCpfCnpj(document)) {
        return res.status(422).json({error:"CNPJ ou CPF inválido"});
      }

      if (campoVazio(cep)) {
        return res.status(400).json({error:"Preencha o campo CEP"});
      }

      if (campoVazio(address)) {
        return res.status(400).json({error: "Preencha o campo Endereço"});
      }

      if (campoVazio(number)) {
        return res.status(400).json({error:"Preencha o campo Número"});
      }

      if (campoVazio(neighborhood)) {
        return res.status(400).json({error: "Preencha o campo Bairro"});

      }
      if (campoVazio(state)) {
        return res.status(400).json({error: "Preencha o campo Estado"});
      }

      if (campoVazio(city)) {
        return res.status(400).json({error: "Preencha o campo Cidade"});
      }

      if (campoVazio(phone)) {
        return res.status(400).json({error: "Preencha o campo Telefone"});
      }

      //validação de CPF ou CNPJ existente
      const phonee = await prisma.client.findFirst({
        where: { phone }
      })

      if (phonee) {
        return res.status(422).json({error:"Já existe umm Cliente Cadastrado com esse Telefone"});
      }

      if (campoVazio(email)) {
        return res.status(400).json({error:`Preencha o campo Email`});
      }

      if (!validaemail(email)) {
        return res.status(422).json({error:"Email Inválido"});
      }

      // Validação de email existente
      let emaill = await prisma.client.findFirst({
        where: { email }
      });

      if (emaill) {
        return res.status(409).json({error:"Já existe um Cliente cadastrado com esse Email"});
      }

      let user = await prisma.user.findFirst({
        where: { id: Number(req.logado.id) }
      });

      if (!user) {
        res.status(301).json({error: "O Usuário Precisa estar Logado Para Editar um Serviço"});
        return
      }

      const client = await prisma.client.create({
        data: {
          name,
          document,
          cep,
          phone,
          email,
          address,
          number: Number(number),
          neighborhood,
          state,
          city,
          isActive: Boolean(isActive),
          userId: Number(req.logado.id)
        }

      });

      res.status(201).json({message: "Cliente Cadastrado com Sucesso!"});
    } catch (err) {
      next(err);
    }
  },
  async index(req, res, next) {
    try {
      let query = {};

      if (req.query.name) {
        query.name = { contains: req.query.name };
      }

      if (req.query.document) {
        query.document = req.query.document;
      }

      if (req.query.cep) {
        query.cep = req.query.cep;
      }

      if (req.query.phone) {
        query.phone = req.query.phone;
      }

      if (req.query.email) {
        query.email = req.query.email;
      }

      if (req.query.address) {
        query.address = req.query.address;
      }

      if (req.query.number) {
        query.number = req.query.number;
      }

      if (req.query.neighborhood) {
        query.neighborhood = req.query.neighborhood;
      }

      if (req.query.state) {
        query.state = req.query.state;
      }

      if (req.query.city) {
        query.city = req.query.city;
      }

      if (req.query.isActive) {
        query.isActive =
          req.query.isActive === "true" || req.query.isActive === true;
      }

      const clients = await prisma.client.findMany({
        where: query,
      });

      if (clients.length == 0) {
        res.status(404).json("Não encontrado");
      } else {
        res.status(200).json(clients);
      }
    } catch (err) {
      next(err);
    }
  },

  async show(req, res, next) {
    try {
      const id = Number(req.params.id);

      let client = await prisma.client.findFirstOrThrow({ where: { id } });

      res.status(200).json(client);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const client = await prisma.client.delete({
        where: { id },
      });

      res.status(201).json({message: "Cliente Deletado com Sucesso!"});
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};


      if (req.body.name) {
        body.name = req.body.name;
      }

      if (req.body.document) {
        body.document = req.body.document;
      }

      if (req.body.cep) {
        body.cep = req.body.cep;
      }

      if (req.body.phone) {
        body.phone = req.body.phone;
      }

      if (req.body.email) {
        body.email = req.body.email;
      }

      if (req.body.address) {
        body.address = req.body.address;
      }

      if (req.body.number) {
        body.number = req.body.number;
      }

      if (req.body.neighborhood) {
        body.neighborhood = req.body.neighborhood;
      }

      if (req.body.state) {
        body.state = req.body.state;
      }
      
      if (req.body.city) {
        body.city = req.body.city;
      }
      
      if (req.body.isActive) {
        body.isActive = Boolean(req.body.isActive);
      }
      
      // Validação Para Campo Vazio
      function campoVazio(campo) {
        // Se for null, undefined ou vazio
        if (campo === null || campo === undefined) {
          return true;
        }
        
        // Se for string, verifica se tem texto (ignora espaços)
        if (typeof campo === "string") {
          return campo.trim().length === 0;
        }
        
        // Se for número, verifica se é NaN ou se é igual a 0 (caso queira considerar 0 como "vazio")
        if (typeof campo === "number") {
          return isNaN(campo);
        }
        
        // Se for qualquer outro tipo (ex: objeto, array), considera "não vazio"
        return false;
      }

      // Validação de Email
      function validaemail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(body.email);
      }


      if (campoVazio(body.name)) {
        return res.status(400).json({error:"Preencha o campo Nome"});
      }
      
      if (campoVazio(body.document)) {
        return res.status(400).json({error:"Preencha o campo CPF ou CNPJ"});
      }
      
      //validação de CPF ou CNPJ existente
      const document = await prisma.client.findFirst({
        where: { document: body.document, NOT: {id: Number(req.params.id)} }
      })

      if (document) {

        if (body.document.length === 14) {
          return res.status(409).json({error:"Já existe um Cliente Cadastrado com esse CPF"});
        }
        else if (body.document.length === 18) {
          return res.status(409).json({error:"Já existe um Cliente Cadastrado com esse CNPJ"});
        }
      }

      if (campoVazio(body.cep)) {
        return res.status(400).json({error:"Preencha o campo CEP"});
      }


      if (campoVazio(body.address)) {
        return res.status(400).json({error:"Preencha o campo Endereço"});
      }

      if (campoVazio(body.number)) {
        return res.status(400).json({error:"Preencha o campo Número"});
      }

      if (campoVazio(body.neighborhood)) {
        return res.status(400).json({error:"Preencha o campo Bairro"});

      }
      if (campoVazio(body.state)) {
        return res.status(400).json({error:"Preencha o campo Estado"});
      }

      if (campoVazio(body.city)) {
        return res.status(400).json({error:"Preencha o campo Cidade"});
      }

      if (campoVazio(body.phone)) {
        return res.status(400).json({error:"Preencha o campo Telefone"});
      }


      //validação de Telefone existente
      const phone = await prisma.client.findFirst({
        where: { phone: body.phone, NOT: {id: Number(req.params.id)} }
      })

      if (phone) {
        return res.status(422).json({error:"Já existe umm Cliente Cadastrado com esse Telefone"});
      }
      
      if (campoVazio(body.email)) {
        return res.status(400).json({error:"Preencha o campo Email"});
      }
      
      if (!validaemail(body.email)) {
        return res.status(422).json({erro:"Email Inválido"});
      }
      
      //validação de Email existente
      const email = await prisma.client.findFirst({
        where: { email: body.email, NOT: {id: Number(req.params.id)} }
      })

      if (email) {
        return res.status(422).json({error:"Já existe umm Cliente Cadastrado com esse Email"});
      }

      
      const id = Number(req.params.id);

      const clientUpdate = await prisma.client.update({
        where: { id },
        data: body,
      });

      res.status(200).json({message: "Dados do Cliente com Sucesso!"});
    } catch (err) {
      res.status(404).json({error: "Não encontrado" });
    }
  },
};
