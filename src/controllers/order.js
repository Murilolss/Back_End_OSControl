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
            const orders = await prisma.order.findMany();
            res.status(200).json(orders)
        }
        catch(error){
            next(error);
        }
    },
}