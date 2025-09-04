import prisma from '../prisma.js';

export const ClientController ={
     async store(req, res, next ){
        try{
        const { name, document, cep, phone, email, address, number, neighborhood, state, city, isActive, userId   } = req.body;
    
        const client = await prisma.client.create({
            data: { 
                name, 
                document, 
                cep, 
                phone, 
                email, 
                address, 
                number, 
                neighborhood, 
                state, 
                city, 
                isActive, 
                userId 
            }
        
     });

     res.status(201).json(client);

    }catch(error){
        next(error);
    }   
   }
}