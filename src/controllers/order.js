import prisma from '../prisma'

export const OrderController = {
    async store(req, res, next){
        try {
            const { salePrice, servicePrice, productPrice, userId, serviceId, clientId } = req.body;
            
            const order = prisma.order.create({
                data : { 
                    salePrice, 
                    servicePrice, 
                    productPrice, 
                    userId, 
                    serviceId, 
                    clientId 
                }
            });
            // respondendo 201-criado encapsulando no formato json(order)
            res.status(201).json(order)
        }
        catch(error){
            next(error);
        }
    }
}