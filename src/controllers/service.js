import prisma from '../prisma'

//C - CREATE, INSERT, POST, SET, STORE

// asincrono nome_da_função(recebendo, responder, próximo)
export const ServiceController = {
    async store(req, res, next){
        const { nameService, price, description, observations, isActive, userId } = req.body;
    
        const service = await prisma.service.create({
            data : { 
                nameService,
                price, 
                description, 
                observations, 
                isActive, 
                userId 
            }
        });
    }
}
