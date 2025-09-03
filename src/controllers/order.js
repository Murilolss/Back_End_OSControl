import prisma from '../prisma'

//C - CREATE, INSERT, POST, SET, STORE

// asincrono nome_da_função(recebendo, responder, próximo)
export const OrderController = {
    async store(req, res, next){
        const { sale_price, service_price, product_price, user_id, service_id, client_id } = req.body;
    
        const order = prisma.order.create({
            data : { 
                sale_price, 
                service_price, 
                product_price, 
                user_id, 
                service_id, 
                client_id 
            }
        });
    }
}