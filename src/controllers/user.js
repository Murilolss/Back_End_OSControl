import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const UserController = {
  async store(req, res, next) {
    try {
      const {
        name,
        lastName,
        email,
        password,
        companyName,
        corporateReason,
        document,
        stateRegistration,
        cep,
        address,
        number,
        neighborhood,
        state,
        city,
        phone,
        site,
        birth,

      } = req.body;

      
      // Verificção de Email Valido
      function validaemail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      }
      
      // Verificção de CPF/CNPJ Valido
      function validaCpfCnpj(documento) {
        const doc = String(documento).replace(/[^\d]/g, "");

        if (doc.length === 11) {
          if (/^0{11}$/.test(doc)) return false;

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
          if (/^0{14}$/.test(doc)) return false;

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
      

      if (!validaCpfCnpj(document)) {
        return res.status(300).json("CNPJ ou CPF inválido");
      }


      if (!validaemail(email)) {
        return res.status(300).json("Email Inválido");
      }



      // Validação de email existente
      let emaill = await prisma.user.findFirst({
        where: { email }
      });

      if (emaill) {
        return res.status(300).json("Email Já Cadastrado");
      }


      //validação de CPF ou CNPJ existente
      const documentt = await prisma.user.findFirst({
        where: { document }
      })
      
      if (documentt) {
        
        if (document.length === 11) {
          return res.status(409).json("O CPF Já está cadastrado");
        }
        else if (document.length === 14) {
          return res.status(409).json("O CNPJ Já está cadastrado");
        }
      }
      
      //validação de senha de pelo menos 8 Caracterer
      if (password.length < 8){
        return res.status(409).json("A Senha deve conter no mínimo 8 caracteres");
      }
      
      
      const hash = await bcrypt.hash(password, 8);

      const user = await prisma.user.create({
        data: {
          name,
          lastName,
          email,
          password: hash,
          companyName,
          corporateReason,
          document,
          stateRegistration,
          cep,
          address,
          number,
          neighborhood,
          state,
          city,
          phone,
          site,
          birth,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  },

  async index(req, res, _next) {
    try {
      let query = {};

      if (req.query.email) {
        query.email = req.query.email;
      }

      if (req.query.document) {
        query.document = req.query.document;
      }

      if (req.query.signature) {
        query.signature = req.query.signature;
      }

      if (req.query.isActive) {
        query.isActive =
          req.query.isActive === "true" || req.query.isActive === true;
      }

      const users = await prisma.user.findMany({
        where: query,
      });
      if (users.length == 0) {
        res.status(404).json("Nada encontrado");
      } else {
        res.status(200).json(users);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro interno ao buscar Users" });
    }
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let user = await prisma.user.findFirstOrThrow({ where: { id } });

      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let user = await prisma.user.delete({ where: { id } });

      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};

      if (req.body.email) {
        body.email = req.body.email;
      }

      if (req.body.document) {
        body.document = req.body.document;
      }

      if (req.body.phone) {
        body.phone = req.body.phone;
      }

      if (req.body.signature) {
        body.signature = req.body.signature;
      }

      if (req.body.isActive) {
        body.isActive = Boolean(req.body.isActive);
      }

      const id = Number(req.params.id);

      const userUpdate = await prisma.user.update({
        where: { id },
        data: body,
      });

      res.status(200).json(userUpdate);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      let user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        res
          .status(404)
          .json({ error: "Usuário com esse email não encontrado" });
        return;
      }

      const ok = await bcrypt.compare(senha, user.password);
      if (!ok) {
        res.status(404).json({ error: "Usuário ou Senha Incorretos" });
        return;
      }


      const token = jwt.sign(
        { sub: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      return res.json({ token })

    }
    catch (e) {
      next(e)
    }
  },

}