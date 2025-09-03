import prisma from '../prisma'

//C - CREATE, INSERT, POST, SET, STORE

// asincrono nome_da_função(recebendo, responder, próximo)
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
        catch(err){
            next(err);
        }
    }
}