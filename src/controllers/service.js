import prisma from "../prisma.js";

export const ServiceController = {
    async store(req, res, next){
        try{
            const { nameService, price, description, observations, isActive} = req.body;

            const error = {}
            
            let user = await prisma.user.findFirst({
                where: {id: Number(req.logado.id)}
            });
            
            if (!user) {
                res.status(301).json({ message: "error: Usuário informado não existe" })
            }

            if (description.length > 300) {
                res.status(401).json({ message: "error: Limite de caracteres atingido" })
            }
            else if (description.length < 10) {
                res.status(401).json({ message: "error: Mínimo de 10 caracteres" })
            }
            
            const service = await prisma.service.create({
                data : { 
                    nameService,
                    price: Number(price), 
                    description, 
                    observations, 
                    isActive: Boolean(isActive), 
                    userId: Number(req.logado.id)
                }
            });
            // respondendo 201-criado encapsulando no formato json(service)
            res.status(201).json(service)
            }
        catch(error){
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
