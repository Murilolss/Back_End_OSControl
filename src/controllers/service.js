import prisma from '../prisma.js';

export const ServiceController = {
    async store(req, res, next){
        try{
            const { nameService, price, description, observations, isActive, userId } = req.body;
            
            const service = await prisma.service.create({
                data : { 
                    nameService,
                    price: Number(price), 
                    description, 
                    observations, 
                    isActive: Boolean(isActive), 
                    userId: Number(userId)
                }
            });
            // respondendo 201-criado encapsulando no formato json(service)
            res.status(201).json(service)
            }
        catch(error){
            next(error);
        }
    },
    
    async index(req, res, next) { 
        try {

            let query = {}

            if (req.query.nameService) {
                query.nameService = req.query.nameService
                query = {nameService: {contains: req.query.nameService} }
            }

            if (req.query.priceMax && req.query.priceMin) {
                query.price = { gte: Number(req.query.priceMin), lte: Number(req.query.priceMax)}
            }
            else if (req.query.priceMax) {
                query.price = {gte: Number(req.query.priceMin)}
            }
            else if (req.query.priceMin) {
                query.price = {lte: Number(req.query.priceMax)}
            }

            if (req.query.isActive ) {
                query.isActive =  req.query.isActive === "true" || req.query.isActive === true
            }

            const services = await prisma.service.findMany({
                where: query
            });

            if (services.length == 0){
                res.status(404).json("Nada encontrado")
            } else {
                res.status(200).json(services)
            }

        }
        catch(error){
            res.status(500).json({ error: "Erro interno ao buscar services" });
        }
    }
}