import prisma from '../prisma.js';

export const OrderController = {
    async store(req, res, next) {
        try {
            const { salePrice, servicePrice, productPrice, userId, serviceId, clientId } = req.body;
            
            const order = await prisma.order.create({
                data: { 
                    salePrice: Number(salePrice), 
                    servicePrice: Number(servicePrice), 
                    productPrice: Number(productPrice), 
                    userId: Number(userId), 
                    serviceId: Number(serviceId), 
                    clientId: Number(clientId) 
                }
            });
            // respondendo 201-criado encapsulando no formato json(order)
            res.status(201).json(order)
        }
        catch(error){
            next(error);
        }
    },
    async index(req, res, next) { 
        try {
            let query = {}

            if (req.query.saleMax && req.query.saleMin) {
                query.salePrice = { gte: Number(req.query.saleMin), lte: Number(req.query.saleMax)}
            }
            else if (req.query.saleMax) {
                query.salePrice = {gte: Number(req.query.saleMin)}
            }
            else if (req.query.saleMin) {
                query.salePrice = {lte: Number(req.query.saleMax)}
            }
            if (req.query.productPrice ) {
                query.productPrice =  req.query.productPrice
            }

            const orders = await prisma.order.findMany({
                where: query
            });
            if (orders.length === 0) {
                return res.status(404).json({ message: "Nada encontrado" })
            } else {
                res.status(200).json(orders)
            }
        }
        catch(error){
            next(error);
        }
    },
}