import prisma from "../prisma.js";

export const ProductController = {
  async store(req, res, next) {
    try {
      const { name, category, description, salesUnit, purchasePrice, salePrice, observations, quantity } = req.body;

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
        return res.status(301).json({ error: "O Usuário Precisa estar Logado Para Criar um Produto" });
      }

      if (campoVazio(name)) {
        return res.status(400).json({ error: "Preencha o Nome do Serviço" });
      }

      if (campoVazio(category)) {
        return res.status(400).json({ error: "Preencha a Categria" });
      }

      if (campoVazio(description)) {
        return res.status(400).json({ error: "Preencha Descrição" });
      }

      if (description.length > 300) {
        return res.status(401).json({ error: "Limite de caracteres atingido" })
      }
      else if (description.length < 10) {
        return res.status(400).json({ error: "A descrição precisa ter no mínimo de 10 caracteres" })
      }

      if (campoVazio(salesUnit)) {
        return res.status(400).json({ error: "Preencha a Unidade de Venda" });
      }

      if (campoVazio(quantity)) {
        return res.status(400).json({ error: "Preencha o Campo Quantidade" });
      }

      if (Number(quantity) <= 0) {
        return res.status(400).json({ error: "A Quantidade Precisa ser no mínimo de 1 Produto" });
      }

      if (campoVazio(purchasePrice)) {
        return res.status(400).json({ error: "Preencha o Preço de Compra" });
      }
      if (campoVazio(salePrice)) {
        return res.status(400).json({ error: "Preencha o Preço de Venda" });
      }


      const product = await prisma.product.create({
        data: {
          name,
          category,
          description,
          salesUnit,
          purchasePrice: Number(purchasePrice),
          salePrice: Number(salePrice),
          observations,
          quantity: Number(quantity),
          userId: Number(req.logado.id)
        }
      });

      return res.status(201).json({ message: "Produto Cadastrado com Sucesso!" });
    } catch (error) {
      next(error);
    }
  },

  async index(req, res, next) {
    try {
      let query = {};

      if (req.query.name) {
        query.name = { contains: req.query.name };
      }

      if (req.query.category) {
        query.category = req.query.category;
      }

      if (req.query.purchasePriceMax && req.query.purchasePriceMin) {
        query.purchasePriceMax = {
          gte: Number(req.query.purchasePriceMin),
          lte: Number(req.query.purchasePriceMax),
        };
      } else if (req.query.purchasePriceMin) {
        query.purchasePrice = { gte: Number(req.query.purchasePriceMin) };
      } else if (req.query.purchasePriceMax) {
        query.purchasePrice = { lte: Number(req.query.purchasePriceMax) };
      }

      if (req.query.salePriceMax && req.query.salePriceMin) {
        query.salePriceMax = {
          gte: Number(req.query.salePriceMin),
          lte: Number(req.query.purchasePriceMax),
        };
      } else if (req.query.salePriceMin) {
        query.salePrice = { gte: Number(req.query.salePriceMin) };
      } else if (req.query.salePriceMax) {
        query.salePrice = { lte: Number(req.query.salePriceMax) };
      }

      const product = await prisma.product.findMany({
        where: query,
      });

      if (product.length == 0) {
        res.status(404).json({ error: "Nenhum Produto Encontrado" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      next(error);
    }
  },

  async show(req, res, next) {
    try {
      const id = Number(req.params.id);

      let product = await prisma.product.findFirstOrThrow({ where: { id } });

      res.status(200).json(product);
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async del(req, res, _next) {
    try {
      const id = Number(req.params.id);

      const product = await prisma.product.delete({
        where: { id },
      });

      res.status(200).json({message: "Produto Deletado com Sucesso!"});
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

  async update(req, res, _next) {
    try {

      let user = await prisma.user.findFirst({
        where: { id: Number(req.logado.id) }
      });

      if (!user) {
        return res.status(301).json({ error: "O Usuário Precisa estar Logado Para Criar um Produto" });
      }

      let body = {};

      if (req.body.name) {
        body.name = req.body.name;
      }

      if (req.body.category) {
        body.category = req.body.category;
      }

      if (req.body.description) {
        body.description = req.body.description;
      }

      if (req.body.salesUnit) {
        body.salesUnit = req.body.salesUnit;
      }

      if (req.body.purchasePrice) {
        body.purchasePrice = Number(req.body.purchasePrice);
      }

      if (req.body.salePrice) {
        body.salePrice = Number(req.body.salePrice);
      }

      if (req.body.quantity) {
        body.quantity = Number(req.body.quantity);
      }

      if (req.body.observations) {
        body.observations = req.body.observations;
      }

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

      if (campoVazio(body.name)) {
        return res.status(400).json({ error: "Preencha o Nome do Serviço" });
      }

      if (campoVazio(body.category)) {
        return res.status(400).json({ error: "Preencha a Categria" });
      }

      if (campoVazio(body.description)) {
        return res.status(400).json({ error: "Preencha Descrição" });
      }

      if (body.description.length > 300) {
        return res.status(401).json({ error: "Limite de caracteres atingido" })
      }
      else if (body.description.length < 10) {
        res.status(400).json({ error: "A descrição precisa ter no mínimo de 10 caracteres" })
      }

      if (campoVazio(body.salesUnit)) {
        return res.status(400).json({ error: "Preencha a Unidade de Venda" });
      }
      
      if (campoVazio(body.purchasePrice)) {
        return res.status(400).json({ error: "Preencha o Preço de Compra" });
      }

      if (campoVazio(body.salePrice)) {
        return res.status(400).json({ error: "Preencha o Preço de Venda" });
      }

      if (campoVazio(body.quantity)) {
        return res.status(400).json({ error: "Preencha o Campo Quantidade" });
      }

      if (Number(body.quantity) <= 0) {
        return res.status(400).json({ error: "A Quantidade Precisa ser no mínimo de 1 Produto" });
      }


      const id = Number(req.params.id);

      const productUpdate = await prisma.product.update({
        where: { id },
        data: body,
      });

      res.status(200).json({ message: "Produto Atualizado com Sucesso!" });
    } catch (err) {
      res.status(404).json({ error: "Não encontrado" });
    }
  },

};
