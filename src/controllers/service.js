import prisma from '../prisma'

//C - CREATE, INSERT, POST, SET, STORE

// asincrono nome_da_função(recebendo, responder, próximo)
export const ServiceController = {
    async store(req, res, next){
        const { name_service, price, description, observations, is_active, user_id } = req.body;
    
        const service = await prisma.service.create({
            data : { 
                name_service,
                price, 
                description, 
                observations, 
                is_active, 
                user_id 
            }
        });
    }
}
