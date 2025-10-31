import prisma from "../prisma.js";

export const ServiceController = {
  async store(req, res, next) {
    try {
      const { nameService, price, description, observations, isActive } = req.body;

      const error = {}

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

      let user = await prisma.user.findFirst({
        where: { id: Number(req.logado.id) }
      });

      if (!user) {
        return res.status(401).json({ error: "O Usuário Precisa estar Logado Para cadastrar um Serviço" })
      }

      if (campoVazio(nameService)) {
        return res.status(400).json({error:"Preencha o Nome do Seriviço"});
      }
      if (campoVazio(description)) {
        return res.status(400).json({error:"Preencha a Descrição"});
      }
      
      if (description.length > 300) {
        return res.status(401).json({ error: "Limite de caracteres atingido" })
      }
      else if (description.length < 10) {
        res.status(400).json({ error: "A descrição precisa ter no mínimo de 10 caracteres" })
      }
      
      if (campoVazio(price)) {
        return res.status(400).json({error:"Preencha o Preço"});
      }


      const service = await prisma.service.create({
        data: {
          nameService,
          price: Number(price),
          description,
          observations,
          isActive: Boolean(isActive),
          userId: Number(req.logado.id)
        }
      });

      res.status(201).json({ message: "Serviço Cadastrado com Sucesso!" });
    }
    catch (error) {
      next(error);
    }
  },

  async index(req, res, _next) {
    try {

      let query = {}

      if (req.query.nameService) {
        query.nameService = { contains: req.query.nameService };
        // query = {nameService: {contains: req.query.nameService} }
      }

      if (req.query.priceMax && req.query.priceMin) {
        query.price = {
          gte: Number(req.query.priceMin),
          lte: Number(req.query.priceMax),
        };
      } else if (req.query.priceMin) {
        query.price = { gte: Number(req.query.priceMin) };
      } else if (req.query.priceMax) {
        query.price = { lte: Number(req.query.priceMax) };
      }

      if (req.query.isActive) {
        query.isActive =
          req.query.isActive === "true" || req.query.isActive === true;
      }

      const services = await prisma.service.findMany({
        where: query,
      });

      if (services.length == 0) {
        res.status(404).json("Nada encontrado");
      } else {
        res.status(200).json(services);
      }
    } catch (err) {
      res.status(500).json({ error: "Erro interno ao buscar services" });
    }
  },

  async show(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let service = await prisma.service.findFirstOrThrow({
        where: { id },
      });

      res.status(200).json(service);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar services" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      let service = await prisma.service.delete({
        where: { id },
      });

      res.status(200).json(service);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar orders" });
    }
  },

  async update(req, res, _next) {
    try {
      let body = {};

      if (req.body.nameService) {
        body.nameService = req.body.nameService;
      }
      if (req.body.price) {
        body.price = Number(req.body.price);
      }
      if (req.body.description) {
        body.description = req.body.description;
      }
      if (req.body.observations) {
        body.observations = req.body.observations;
      }
      if (req.body.isActive) {
        body.isActive = Boolean(req.body.isActive);
      }

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

      let user = await prisma.user.findFirst({
        where: { id: Number(req.logado.id) }
      });

      if (!user) {
        return res.status(401).json({ error: "O Usuário Precisa estar Logado Para Editar um Serviço" })
      }

      if (campoVazio(nameService)) {
        return res.status(400).json({error:"Preencha o Nome do Seriviço"});
      }
      if (campoVazio(description)) {
        return res.status(400).json({error:"Preencha a Descrição"});
      }
      
      if (description.length > 300) {
        return res.status(401).json({ error: "Limite de caracteres atingido" })
      }
      else if (description.length < 10) {
        res.status(400).json({ error: "A descrição precisa ter no mínimo de 10 caracteres" })
      }
      
      if (campoVazio(price)) {
        return res.status(400).json({error:"Preencha o Preço"});
      }

      const id = Number(req.params.id);

      const updateService = await prisma.service.update({
        where: { id },
        data: body,
      });

      res.status(200).json(updateService);
    } catch (err) {
      res.status(404).json({ error: "Erro interno ao buscar orders" });
    }
  },
};
