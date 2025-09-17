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
                query = {nameService: (req.query.nameService)}
            }
            if (Number(req.query.price)) {
                query = {price: Number(req.query.price)}
            }
            if (req.query.isActive) {
                query = {isActive: (req.query.isActive)}
            }

            const services = await prisma.service.findMany({
                where: query
            });
            res.status(200).json(services)
        }
        catch(error){
            next(error);
        }
    }
}